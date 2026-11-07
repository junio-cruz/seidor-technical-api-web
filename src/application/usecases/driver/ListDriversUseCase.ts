import { Logger } from '../../../infra/logger/Logger';
import { Driver } from '../../../domain/entities/Driver';
import { IListDriversRepository } from '../../../domain/repositories/Driver/IListDriverRepository';
import { ListDriversRepository } from '../../../infra/database/repositories/Driver/ListDriverRepository';

export type ListDriversUseCaseInput = { 
  filter?: {
    name?: string;
  };
  order?: {
    [field: string]: 'asc' | 'desc';
  };
  pagination?: {
    page?: number;
    page_size?: number;
  };
};

export type ListDriversUseCaseOutput = {
  page: number;
  page_data: Driver[];
  page_count: number;
  all_count: number;
  all_pages_count: number;
};
export interface IListDriversUseCase {
  execute(input: ListDriversUseCaseInput): Promise<ListDriversUseCaseOutput>;
}

export class ListDriversUseCase implements IListDriversUseCase {
  constructor(
    private readonly logger: Logger,  
    private listDriversRepository: IListDriversRepository = new ListDriversRepository(),
  ) {
    this.logger.getChild('ListDriversUseCase');
  }

  public async execute(
    input: ListDriversUseCaseInput,
  ): Promise<ListDriversUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const response = await this.listDriversRepository.execute(input);
    this.logger.debug('execute output', response);
    return response;
  }
}
