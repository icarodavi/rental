import { Car } from "../infra/typeorm/entities/Car";
import { ICreateCarDTO } from "./dtos/ICarsDTO";

interface ICarsRepository {
  create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    final_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car>;

  findByLicensePlate(license_plate: string): Promise<Car>;
}
export { ICarsRepository };
