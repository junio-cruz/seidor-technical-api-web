import { Logger } from '../../../infra/logger/Logger';
import { VehicleUsage } from '../../../domain/entities/VehicleUsage';
import { IListVehicleUsageRepository } from '../../../domain/repositories/VehicleUsage/IListVehicleUsageRepository';
import { ListVehicleUsageRepository } from '../../../infra/database/repositories/VehicleUsage/ListVehicleUsageRepository';

export type ListVehicleUsageUseCaseInput = { 
  filter?: {
    driver_id?: string;
    vehicle_id?: string;
    use_start_date?: Date;
    use_end_date?: Date;
  };
  order?: {
    [field: string]: 'asc' | 'desc';
  };
  pagination?: {
    page?: number;
    page_size?: number;
  };
};

export type ListVehicleUsageUseCaseOutput = {
  page: number;
  page_data: VehicleUsage[];
  page_count: number;
  all_count: number;
  all_pages_count: number;
};
export interface IListVehicleUsageUseCase {
  execute(input: ListVehicleUsageUseCaseInput): Promise<ListVehicleUsageUseCaseOutput>;
}

export class ListVehicleUsageUseCase implements IListVehicleUsageUseCase {
  constructor(
    private readonly logger: Logger,  
    private listVehicleUsageRepository: IListVehicleUsageRepository = new ListVehicleUsageRepository(),
  ) {
    this.logger.getChild('ListVehicleUsageUseCase');
  }

  public async execute(
    input: ListVehicleUsageUseCaseInput,
  ): Promise<ListVehicleUsageUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const response = await this.listVehicleUsageRepository.execute(input);
    this.logger.debug('execute output', response);
    return response;
  }
}
