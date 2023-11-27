import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEnterpriseDto } from './domain/dtos/create-enterprise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { EnterpriseEntity } from 'src/entities/enterprise.entities';
import { UpdateEnterpriseDto } from './domain/dtos/update-enterprise.dto';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(EnterpriseEntity)
    private enterpriseRepository: Repository<EnterpriseEntity>,
  ) {}

  async createEnterprise(
    createEnterpriseDto: CreateEnterpriseDto,
  ): Promise<EnterpriseEntity> {
    try {
      const hero = this.enterpriseRepository.create(createEnterpriseDto);

      return this.enterpriseRepository.save(hero);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async patchEnterprise(
    patchEnterprise: UpdateEnterpriseDto,
    id: string,
  ): Promise<EnterpriseEntity> {
    try {
      const enterprise = await this.enterpriseRepository.update(
        id,
        patchEnterprise,
      );

      return await this.enterpriseRepository.findOneByOrFail({ id: id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  /**
   * @param search string - Search by nome fantasia
   * @param items number - Quantity of items in that page
   * @param page number - Quantity of pages
   */

  async listEnterprise(search: string, items?: number, page?: number) {
    try {
      const enterpriseList = await this.enterpriseRepository.findAndCountBy({
        nomeFantasia: ILike(`%${search}%`),
      });

      if (items && page) {
        const initialSlice = items * page;
        const finalSlice = items * page + items;

        const paginatedEnterpriseList = enterpriseList[0].slice(
          initialSlice,
          finalSlice,
        );

        return paginatedEnterpriseList ? paginatedEnterpriseList : [];
      }

      return enterpriseList ? enterpriseList : [];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findEnterprise(id: string) {
    try {
      const enterprise = await this.enterpriseRepository.findOne({
        where: { id },
      });

      return enterprise ? enterprise : null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const enterprise = await this.enterpriseRepository.delete({ id: id });
      const checkEnterprise = await this.enterpriseRepository.exist({
        where: { id: id },
      });
      return !checkEnterprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
