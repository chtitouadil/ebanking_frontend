export interface AccountDetails {
  accountId:            string;
  id:                   string;
  balance:              number;
  rate:                 number;
  accountType:          string;
  idCustomer:           string;
  currentPage:          number;
  totalPages:           number;
  pageSize:             number;
  accountOperationDTOS: AccountOperation[];
}

export interface AccountOperation {
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;
  description:   string;
}
