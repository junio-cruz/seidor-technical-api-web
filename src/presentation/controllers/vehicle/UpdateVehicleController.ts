import {
  HttpBadRequestError,
  HttpError,
  HttpNotFoundError,
} from '../../../presentation/http/errors';
import { HttpRequest } from '../../../presentation/http/request';
import { HttpOkResponse, HttpResponse } from '../../../presentation/http/response';
import { IHttpController } from '../../../application/protocols/http/IHttp';
import {
  IUpdateVehicleUseCase,
  UpdateVehicleUseCase,
} from '../../../application/usecases/vehicle/UpdateVehicleUseCase';
import { IRequestValidator } from '../../../application/protocols/validator/IValidator';
import {
  stringValidatorSchema,
} from '../../validatorSchemas/validators';

import { Logger } from '../../../infra/logger/Logger';
import { FastestValidator } from '../../../infra/validators/FastestValidator';
import { vehicleResolver } from '../../../domain/entities/Vehicle';

type RequestParams = {
  vehicle_id: string;
};

type RequestBodyParameters = {
  plate?: string;
  mark?: string;
  color?: string;
};

export class UpdateVehicleController implements IHttpController {
  constructor(
    private readonly logger: Logger,
    private readonly requestValidator: IRequestValidator = new FastestValidator(),
    private readonly updateVehicleUseCase: IUpdateVehicleUseCase = new UpdateVehicleUseCase(
      logger,
    ),
  ) {
    this.logger.getChild('UpdateVehicleController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    const { vehicle_id } = request.params as RequestParams;
    const { plate, mark, color } = request.body as RequestBodyParameters;

    const requestValidation = await this.requestValidator.validate(
      {
        plate,
        mark,
        color,
      },
      {
        plate: stringValidatorSchema({ optional: true }),
        mark: stringValidatorSchema({ optional: true }),
        color: stringValidatorSchema({ optional: true }),
      },
    );

    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }


    const vehicle = await this.updateVehicleUseCase.execute({
      vehicle_id,
      to_update: {
        plate,
        mark,
        color,
      },
    });

    if (!vehicle) {
      return new HttpNotFoundError('Vehicle_NOT_FOUND');
    }

    return new HttpOkResponse(vehicleResolver(vehicle));
  }
}
