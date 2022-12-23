import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { AccountDetails } from '../model/account.model';
import {Customer} from "../model/customer.model";
import {catchError, Observable, throwError} from "rxjs";

import { AccountsService } from '../services/accounts.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerId! : string ;
  accountFormGroup! : FormGroup;
  id:any;name:any;email:any;
  customer! : Customer;
  errorMessage! :string ;
  accountObservable! : Observable<AccountDetails>
  accountObservabl! : Observable<AccountDetails>
  searchFormGroup! : FormGroup | undefined;
  accounts! : Observable<Array<AccountDetails>>;
  customers! : Observable<Array<Customer>>;
  currentPage : number =0;
  pageSize : number =5;
  userForm!: FormGroup;
  constructor(private customerService:CustomerService, private fb : FormBuilder,private accountService:AccountsService, private route : ActivatedRoute, private router :Router) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.handleSearchAccount();
    this.accountFormGroup=this.fb.group({
      accountId : this.fb.control('')
    });
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchAccounts();
    this.handleSearchCustomers();

  }

  SearchAccount() {
    let accountId : string =this.accountFormGroup.value.accountId;
    console.log("accountid : ",accountId)
    this.accountObservable=this.accountService.getAccount(accountId,this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );console.log(this.accountObservable)
  }
  
  handleSearchCustomers() {
    let kw=this.searchFormGroup?.value.keyword;
    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    this.id=this.customer.id;
    this.name=this.customer.name;
    this.email=this.customer.email;
  }

  handleSearchAccount() {
    this.accountObservabl=this.accountService.getListAccount().pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

 
  handleSearchAccounts() {
    let kw=this.searchFormGroup?.value.keyword;
    this.accounts=this.accountService.searchAccounts(this.customerId).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  gotoPage(page: number) {
    this.currentPage=page;
    this.SearchAccount();
  }

 

}
