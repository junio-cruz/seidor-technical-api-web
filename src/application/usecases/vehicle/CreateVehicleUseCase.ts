import { Vehicle } from '../../../domain/entities/Vehicle';
import { Logger } from '../../../infra/logger/Logger';
import { ICreateVehicleRepository } from '../../../domain/repositories/Vehicle/ICreateVehicleRepository';
import { CreateVehicleRepository } from '../../../infra/database/repositories/Vehicle/CreateVehicleRepository';
import { IGuidGenerator } from '../../../application/protocols/guid/IGuidGenerator';
import { UUIDGuidGenerator } from '../../../infra/guidGenerator/UUIDGuidGenerator';

export type CreateVehicleUseCaseInput = {
  plate: string;
  color: string;
  mark: string;                                           
};
    
export type CreateVehicleUseCaseOutput = Vehicle;

export interface ICreateVehicleUseCase {
  execute(input: CreateVehicleUseCaseInput): Promise<CreateVehicleUseCaseOutput>;
}

export class CreateVehicleUseCase implements ICreateVehicleUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly guidGenerator: IGuidGenerator = new UUIDGuidGenerator(),
    private createVehicleRepository: ICreateVehicleRepository = new CreateVehicleRepository(),
  ) {
    this.logger.getChild('CreateVehicleUseCase');
  }

  public async execute(
    input: CreateVehicleUseCaseInput,
  ): Promise<CreateVehicleUseCaseOutput> {
    this.logger.debug('execute input', JSON.stringify(input));
    const vehicle = await this.createVehicleRepository.execute({
      vehicle_id: this.guidGenerator.uuidV4(),
      plate: input.plate,
      color: input.color,
      mark: input.mark,
    });
    this.logger.debug('creaete user repository response', vehicle);
    this.logger.debug('execute output', vehicle);
    return vehicle;
  }

  
}
