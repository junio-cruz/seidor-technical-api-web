import {
  HttpBadRequestError,
  HttpError,
  HttpNotFoundError,
} from '../../../presentation/http/errors';
import { HttpRequest } from '../../../presentation/http/request';
import { HttpOkResponse, HttpResponse } from '../../../presentation/http/response';
import { IHttpController } from '../../../application/protocols/http/IHttp';
import {
  IUpdateDriverUseCase,
  UpdateDriverUseCase,
} from '../../../application/usecases/driver/UpdateDriverUseCase';
import { IRequestValidator } from '../../../application/protocols/validator/IValidator';
import {
  nameValidatorSchema,
} from '../../validatorSchemas/validators';

import { Logger } from '../../../infra/logger/Logger';
import { FastestValidator } from '../../../infra/validators/FastestValidator';
import { driverResolver } from '../../../domain/entities/Driver';

type RequestParams = {
  driver_id: string;
};

type RequestBodyParameters = {
  name?: string;
};

export class UpdateDriverController implements IHttpController {
  constructor(
    private readonly logger: Logger,
    private readonly requestValidator: IRequestValidator = new FastestValidator(),
    private readonly updateDriverUseCase: IUpdateDriverUseCase = new UpdateDriverUseCase(
      logger,
    ),
  ) {
    this.logger.getChild('UpdateDriverController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    const { driver_id } = request.params as RequestParams;
    const { name } = request.body as RequestBodyParameters;

    const requestValidation = await this.requestValidator.validate(
      {
        name,
      },
      {
        name: nameValidatorSchema({ optional: true }),
      },
    );

    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }


    const driver = await this.updateDriverUseCase.execute({
      driver_id,
      to_update: {
        name,
      },
    });

    if (!driver) {
      return new HttpNotFoundError('DRIVER_NOT_FOUND');
    }

    return new HttpOkResponse(driverResolver(driver));
  }
}
