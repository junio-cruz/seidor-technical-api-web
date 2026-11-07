import { HttpRequest } from '../../http/request';
import { HttpOkResponse, HttpResponse } from '../../http/response';
import { HttpBadRequestError, HttpConflictError, HttpError, HttpInternalServerError } from '../../http/errors';
import { IHttpController } from '../../../application/protocols/http/IHttp';
import {
  ICreateVehicleUsageUseCase,
  CreateVehicleUsageUseCase,
} from '../../../application/usecases/vehicleUsage/CreateVehicleUsageUseCase';
import { IRequestValidator } from '../../../application/protocols/validator/IValidator';
import {
  nameValidatorSchema,
  stringValidatorSchema,
  driverValidatorSchema,
  vehicleValidatorSchema,
} from '../../validatorSchemas/validators';

import { Logger } from '../../../infra/logger/Logger';
import { FastestValidator } from '../../../infra/validators/FastestValidator';
import { Vehicle } from '../../../domain/entities/Vehicle';
import { Driver } from '../../../domain/entities/Driver';
  import { vehicleUsageResolver } from '../../../domain/entities/VehicleUsage';

type RequestBodyParams = {
  driver: Driver;
  vehicle: Vehicle;
  use_reason: string;
};

export class CreateVehicleUsageController implements IHttpController {
  constructor(
    private readonly logger: Logger,
    private readonly requestValidator: IRequestValidator = new FastestValidator(),
    private readonly createVehicleUsageUserUseCase: ICreateVehicleUsageUseCase = new CreateVehicleUsageUseCase(
      logger,
    ),
  ) {
    this.logger = this.logger.getChild('CreateVehicleUsageController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    const { driver, vehicle, use_reason } = request.body as RequestBodyParams;

    const requestValidation = await this.requestValidator.validate(
      {
        driver,
        vehicle,
        use_reason,
      },
      {
        driver: driverValidatorSchema({ optional: false }),
        vehicle: vehicleValidatorSchema({ optional: false }),
        use_reason: stringValidatorSchema({ optional: false }),
      },
    );

    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }

  

    try {
        const vehicleUsage = await this.createVehicleUsageUserUseCase.execute({
      driver,
      vehicle,
      use_reason,
    });
      return new HttpOkResponse(vehicleUsageResolver(vehicleUsage));
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'Vehicle usage already exists') {
        return new HttpConflictError('VEHICLE_USAGE_ALREADY_EXISTS');
      }
      return new HttpInternalServerError(new Error('INTERNAL_SERVER_ERROR'));
    }
  }
}
