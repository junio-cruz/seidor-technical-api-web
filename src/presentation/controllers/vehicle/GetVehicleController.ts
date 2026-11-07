import { HttpRequest } from '../../http/request';
import { HttpOkResponse, HttpResponse } from '../../http/response';
import { HttpBadRequestError, HttpError } from '../../http/errors';
import { IHttpController } from '../../../application/protocols/http/IHttp';
import {
  IGetVehicleUseCase,
  GetVehicleUseCase,
} from '../../../application/usecases/vehicle/GetVehicleUseCase';
import { IRequestValidator } from '../../../application/protocols/validator/IValidator';
import {
  nameValidatorSchema,
  stringValidatorSchema,
  uuidV4ValidatorSchema,
} from '../../validatorSchemas/validators';

import { Logger } from '../../../infra/logger/Logger';
import { FastestValidator } from '../../../infra/validators/FastestValidator';
import { vehicleResolver } from '../../../domain/entities/Vehicle';
import { HttpNotFoundError } from '../../http/errors';

type RequestBodyParams = {
  vehicle_id: string;
};

export class GetVehicleController implements IHttpController {
  constructor(
    private readonly logger: Logger,
    private readonly requestValidator: IRequestValidator = new FastestValidator(),
    private readonly GetVehicleUserUseCase: IGetVehicleUseCase = new GetVehicleUseCase(
      logger,
    ),
  ) {
    this.logger = this.logger.getChild('GetVehicleController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    const { vehicle_id } = request.params as RequestBodyParams;

    const requestValidation = await this.requestValidator.validate(
      {
        vehicle_id,
      },
      {
        vehicle_id: uuidV4ValidatorSchema({ optional: false }),
      },
    );

    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }

    const vehicle = await this.GetVehicleUserUseCase.execute({
      vehicle_id,
    });


    if (!vehicle) {
      return new HttpNotFoundError('VEHICLE_NOT_FOUND');
    }

    return new HttpOkResponse(vehicleResolver(vehicle));

  }
}
