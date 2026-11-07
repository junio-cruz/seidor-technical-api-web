import { HttpRequest } from '../../http/request';
import { HttpOkResponse, HttpResponse } from '../../http/response';
import { HttpBadRequestError, HttpError } from '../../http/errors';
import { IHttpController } from '../../../application/protocols/http/IHttp';
import {
  ICreateVehicleUseCase,
  CreateVehicleUseCase,
} from '../../../application/usecases/vehicle/CreateVehicleUseCase';
import { IRequestValidator } from '../../../application/protocols/validator/IValidator';
import {
  nameValidatorSchema,
  stringValidatorSchema,
} from '../../validatorSchemas/validators';

import { Logger } from '../../../infra/logger/Logger';
import { FastestValidator } from '../../../infra/validators/FastestValidator';

type RequestBodyParams = {
  plate: string;
  mark: string;
  color: string;
};

export class CreateVehicleController implements IHttpController {
  constructor(
    private readonly logger: Logger,
    private readonly requestValidator: IRequestValidator = new FastestValidator(),
    private readonly createVehicleUserUseCase: ICreateVehicleUseCase = new CreateVehicleUseCase(
      logger,
    ),
  ) {
    this.logger = this.logger.getChild('CreateVehicleController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    const { plate, mark, color } = request.body as RequestBodyParams;

    const requestValidation = await this.requestValidator.validate(
      {
        plate,
        mark,
        color,
      },
      {
        plate: nameValidatorSchema({ optional: false }),
        mark: stringValidatorSchema({ optional: false }),
        color: stringValidatorSchema({ optional: false }),
      },
    );

    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }

    const response = await this.createVehicleUserUseCase.execute({
      plate,
      mark,
      color,
    });

    return new HttpOkResponse(response);
  }
}
