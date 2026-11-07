import { HttpRequest } from '../../http/request';
import { HttpOkResponse, HttpResponse } from '../../http/response';
import { HttpBadRequestError, HttpError } from '../../http/errors';
import { IHttpController } from '../../../application/protocols/http/IHttp';
import {
  IListDriversUseCase,
  ListDriversUseCase,
} from '../../../application/usecases/driver/ListDriversUseCase';
import { IRequestValidator } from '../../../application/protocols/validator/IValidator';
import {
  nameValidatorSchema,
  pageSizeValidatorSchema,
  pageValidatorSchema,
} from '../../validatorSchemas/validators';

import { Logger } from '../../../infra/logger/Logger';
import { FastestValidator } from '../../../infra/validators/FastestValidator';

type RequestQueryParameters = {
  name?: string;
  page?: number;
  page_size?: number;
};

export class ListDriversController implements IHttpController {
  constructor(
    private readonly logger: Logger,
    private readonly requestValidator: IRequestValidator = new FastestValidator(),
    private readonly listDriversUseCase: IListDriversUseCase = new ListDriversUseCase(
      logger,
    ),
  ) {
    this.logger = this.logger.getChild('ListDriversController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    let { name, page, page_size } =
      (request.query || {}) as RequestQueryParameters;


    const requestValidation = await this.requestValidator.validate(
      {
        name,
        page,
        page_size,
      },
      {
        name: nameValidatorSchema({ optional: true }),
        page: pageValidatorSchema({ optional: true }),
        pageSize: pageSizeValidatorSchema({ optional: true }),
      },
    );
    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }
    const filter: { [index: string]: unknown } = {
      name,
      page,
      page_size,
    };

    Object.keys(filter).forEach(
      key => filter[key] === undefined && delete filter[key],
    );

    const response = await this.listDriversUseCase.execute({
      filter,
      order: {
        [request.query?.orderField || 'created_at']:
          request.query?.orderDirection || 'asc',
      },
      pagination: {
        page: Number(request.query?.page) || 1,
        page_size: Number(request.query?.page_size) || 10,
      },
    });
    return new HttpOkResponse(response);
  }
}
