import { Logger } from '../../../infra/logger/Logger';
import { Vehicle } from '../../../domain/entities/Vehicle';
import { IListVehicleRepository } from '../../../domain/repositories/Vehicle/IListVehicleRepository';
import { ListVehicleRepository } from '../../../infra/database/repositories/Vehicle/ListVehicleRepository';

export type ListVehiclesUseCaseInput = { 
  filter?: {
    mark?: string;
    color?: string;
  };
  order?: {
    [field: string]: 'asc' | 'desc';
  };
  pagination?: {
    page?: number;
    page_size?: number;
  };
};

export type ListVehiclesUseCaseOutput = {
  page: number;
  page_data: Vehicle[];
  page_count: number;
  all_count: number;
  all_pages_count: number;
};
export interface IListVehiclesUseCase {
  execute(input: ListVehiclesUseCaseInput): Promise<ListVehiclesUseCaseOutput>;
}

export class ListVehiclesUseCase implements IListVehiclesUseCase {
  constructor(
    private readonly logger: Logger,  
    private listVehiclesRepository: IListVehicleRepository = new ListVehicleRepository(),
  ) {
    this.logger.getChild('ListVehiclesUseCase');
  }

  public async execute(
    input: ListVehiclesUseCaseInput,
  ): Promise<ListVehiclesUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const response = await this.listVehiclesRepository.execute(input);
    this.logger.debug('execute output', response);
    return response;
  }
}
