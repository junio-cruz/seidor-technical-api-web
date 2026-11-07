import { HttpRequest } from '../../http/request';
import { HttpOkResponse, HttpResponse } from '../../http/response';
import { HttpBadRequestError, HttpError } from '../../http/errors';
import { IHttpController } from '../../../application/protocols/http/IHttp';
import {
  IDeleteVehicleUseCase,
  DeleteVehicleUseCase,
} from '../../../application/usecases/vehicle/DeleteVehicleUseCase';
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

export class DeleteVehicleController implements IHttpController {
  constructor(
    private readonly logger: Logger,
    private readonly requestValidator: IRequestValidator = new FastestValidator(),
    private readonly deleteVehicleUserUseCase: IDeleteVehicleUseCase = new DeleteVehicleUseCase(
      logger,
    ),
  ) {
    this.logger = this.logger.getChild('DeleteVehicleController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    const { vehicle_id } = request.body as RequestBodyParams;

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

    const vehicle = await this.deleteVehicleUserUseCase.execute({
      vehicle_id,
    });


        if (!vehicle) {
          return new HttpNotFoundError('VEHICLE_NOT_FOUND');
        }
    
        return new HttpOkResponse(vehicleResolver(vehicle));

  }
}
