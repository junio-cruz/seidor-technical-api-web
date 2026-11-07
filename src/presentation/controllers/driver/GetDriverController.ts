import {
  HttpBadRequestError,
  HttpError,
  HttpNotFoundError,
} from '../../http/errors';
import { HttpRequest } from '../../http/request';

import { HttpOkResponse, HttpResponse } from '../../http/response';
import { IHttpController } from '../../../application/protocols/http/IHttp';
import {
  GetDriverUseCase,
  IGetDriverUseCase,
} from '../../../application/usecases/driver/GetDriverUseCase';
import { IRequestValidator } from '../../../application/protocols/validator/IValidator';
import { uuidV4ValidatorSchema } from '../../validatorSchemas/validators';

import { Logger } from '../../../infra/logger/Logger';
import { driverResolver } from '../../../domain/entities/Driver';
import { FastestValidator } from '../../../infra/validators/FastestValidator';

type RequestParams = {
  driver_id: string;
};
export class GetDriverController implements IHttpController {
  constructor(
    private readonly logger: Logger,
    private readonly requestValidator: IRequestValidator = new FastestValidator(),
    private readonly getDriverUseCase: IGetDriverUseCase = new GetDriverUseCase(
      logger,
    ),
  ) {
    this.logger.getChild('GetDriverController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    const { driver_id } = request.params as RequestParams;

    const requestValidation = await this.requestValidator.validate(
      {
        driver_id,
      },
      {
        driver_id: uuidV4ValidatorSchema({ optional: false }),
      },
    );

    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }

    const driver = await this.getDriverUseCase.execute({
      driver_id,
    });

    if (!driver) {
      return new HttpNotFoundError('DRIVER_NOT_FOUND');
    }

    return new HttpOkResponse(driverResolver(driver));
  }
}
