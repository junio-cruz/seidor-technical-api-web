import { HttpRequest } from '../../http/request';
import { HttpOkResponse, HttpResponse } from '../../http/response';
import { HttpBadRequestError, HttpError } from '../../http/errors';
import { IHttpController } from '../../../application/protocols/http/IHttp';
import {
  IListVehiclesUseCase,
  ListVehiclesUseCase,
} from '../../../application/usecases/vehicle/ListVehiclesUseCase';
import { IRequestValidator } from '../../../application/protocols/validator/IValidator';
import {
  stringValidatorSchema,
  pageSizeValidatorSchema,
  pageValidatorSchema,
} from '../../validatorSchemas/validators';

import { Logger } from '../../../infra/logger/Logger';
import { FastestValidator } from '../../../infra/validators/FastestValidator';

type RequestQueryParameters = {
  mark: string;
  color?: string;
  plate?: string;
  page?: number;
  page_size?: number;
};

export class ListVehiclesController implements IHttpController {
  constructor(
    private readonly logger: Logger,
    private readonly requestValidator: IRequestValidator = new FastestValidator(),
    private readonly listVehiclesUseCase: IListVehiclesUseCase = new ListVehiclesUseCase(
      logger,
    ),
  ) {
    this.logger = this.logger.getChild('ListVehiclesController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    let { mark, color, plate, page, page_size } =
      (request.query || {}) as RequestQueryParameters;


    const requestValidation = await this.requestValidator.validate(
      {
        mark,
        color,
        plate,
        page,
        page_size,
      },
      {
        mark: stringValidatorSchema({ optional: true }),
        color: stringValidatorSchema({ optional: true }),
        plate: stringValidatorSchema({ optional: true }),
        page: pageValidatorSchema({ optional: true }),
        pageSize: pageSizeValidatorSchema({ optional: true }),
      },
    );
    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }
    const filter: { [index: string]: unknown } = {
      mark,
      color,
      plate,
      page,
      page_size,
    };

    Object.keys(filter).forEach(
      key => filter[key] === undefined && delete filter[key],
    );

    const response = await this.listVehiclesUseCase.execute({
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
