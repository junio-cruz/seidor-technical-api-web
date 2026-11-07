import { HttpRequest } from '../../http/request';
import { HttpOkResponse, HttpResponse } from '../../http/response';
import { HttpBadRequestError, HttpError } from '../../http/errors';
import { IHttpController } from '../../../application/protocols/http/IHttp';
import {
  IListVehicleUsageUseCase,
  ListVehicleUsageUseCase,
} from '../../../application/usecases/vehicleUsage/ListVehicleUsageUseCase';
import { IRequestValidator } from '../../../application/protocols/validator/IValidator';
import {
  pageSizeValidatorSchema,
  pageValidatorSchema,
} from '../../validatorSchemas/validators';

import { Logger } from '../../../infra/logger/Logger';
import { FastestValidator } from '../../../infra/validators/FastestValidator';

type RequestQueryParameters = {
  page?: number;
  page_size?: number;
};

export class ListVehicleUsageController implements IHttpController {
  constructor(
    private readonly logger: Logger,
    private readonly requestValidator: IRequestValidator = new FastestValidator(),
    private readonly listVehicleUsageUseCase: IListVehicleUsageUseCase = new ListVehicleUsageUseCase(
      logger,
    ),
  ) {
    this.logger = this.logger.getChild('ListVehicleUsageController');
  }

  public async handle(request: HttpRequest): Promise<HttpResponse | HttpError> {
    let { page, page_size } =
      request.query as RequestQueryParameters;


    const requestValidation = await this.requestValidator.validate(
      {
        page,
        page_size,
      },
      {
        page: pageValidatorSchema({ optional: true }),
        pageSize: pageSizeValidatorSchema({ optional: true }),
      },
    );
    if (!requestValidation.isValid) {
      return new HttpBadRequestError(requestValidation.errors);
    }
    const filter: { [index: string]: unknown } = {
      page,
      page_size,
    };

    Object.keys(filter).forEach(
      key => filter[key] === undefined && delete filter[key],
    );

    const response = await this.listVehicleUsageUseCase.execute({
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
