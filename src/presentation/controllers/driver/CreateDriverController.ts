import { HttpRequest } from '../../http/request';
import { HttpOkResponse, HttpResponse } from '../../http/response';
import { HttpBadRequestError, HttpError } from '../../http/errors';
import { IHttpController } from '../../../application/protocols/http/IHttp';
import {
  ICreateDriverUseCase,
  CreateDriverUseCase,
} from '../../../application/usecases/driver/CreateDriverUseCase';
import { IRequestValidator } from '../../../application/protocols/validator/IValidator';
import {
  nameValidatorSchema,
} from '../../validatorSchemas/validators';

import { Logger } from '../../../infra/logger/Logger';
import { FastestValidator } from '../../../infra/validators/FastestValidator';

type RequestBodyParams = {
  name: string;
};

export class CreateDriverController implements IHttpController {
  constructor(
    private readonly logger: Logger,
    private readonly requestValidator: IRequestValidator = new FastestValidator(),
    private readonly createDriverUserUseCase: ICreateDriverUseCase = new CreateDriverUseCase(
      logger,
    ),
  ) {
    this.logger = this.logger.getChild('CreateDriverController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    const { name } = request.body as RequestBodyParams;

    const requestValidation = await this.requestValidator.validate(
      {
        name,
      },
      {
        name: nameValidatorSchema({ optional: false }),
      },
    );

    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }

    const response = await this.createDriverUserUseCase.execute({
      name,
    });

    return new HttpOkResponse(response);
  }
}
