/**
 * @param search string - Search by enterprise name
 * @param page number - Number of pagination
 * @param items number - Quantity of items in that page
 */
export class PaginationEnterpriseQuery {
  constructor(
    public readonly search: string,
    public readonly page: number,
    public readonly items: number,
  ) {}
}
