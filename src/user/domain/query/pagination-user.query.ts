/**
 * @param page number - Number of pagination
 * @param items number - Quantity of items in that page
 */
export class PaginationUserQuery {
  constructor(
    public readonly page: number,
    public readonly items: number,
  ) {}
}
