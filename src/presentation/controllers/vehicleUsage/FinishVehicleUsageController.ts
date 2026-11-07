import {
  HttpBadRequestError,
  HttpError,
  HttpNotFoundError,
} from '../../../presentation/http/errors';
import { HttpRequest } from '../../../presentation/http/request';
import { HttpOkResponse, HttpResponse } from '../../../presentation/http/response';
import { IHttpController } from '../../../application/protocols/http/IHttp';
import {
  IFinishVehicleUsageUseCase,
  FinishVehicleUsageUseCase,
} from '../../../application/usecases/vehicleUsage/FinishVehicleUsageUseCase';
import { IRequestValidator } from '../../../application/protocols/validator/IValidator';
import {
  stringValidatorSchema,
} from '../../validatorSchemas/validators';

import { Logger } from '../../../infra/logger/Logger';
import { FastestValidator } from '../../../infra/validators/FastestValidator';
import { vehicleResolver } from '../../../domain/entities/Vehicle';

type RequestParams = {
  vehicle_usage_id: string;
};

export class FinishVehicleController implements IHttpController {
  constructor(
    private readonly logger: Logger,
    private readonly requestValidator: IRequestValidator = new FastestValidator(),
    private readonly finishVehicleUsageUseCase: IFinishVehicleUsageUseCase = new FinishVehicleUsageUseCase(
      logger,
    ),
  ) {
    this.logger.getChild('FinishVehicleController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    const { vehicle_usage_id } = request.params as RequestParams;

    const requestValidation = await this.requestValidator.validate(
      {
        vehicle_usage_id,
      },
      {
        vehicle_usage_id: stringValidatorSchema({ optional: false }),
      },
    );

    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }


    const vehicleUsage = await this.finishVehicleUsageUseCase.execute({
      vehicle_usage_id
    });

    if (!vehicleUsage) {
      return new HttpNotFoundError('VEHICLE_USAGE_NOT_FOUND');
    }
    
    return new HttpOkResponse(vehicleUsage);
  }
}
