import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountDetails } from '../model/account.model';
import { Customer } from '../model/customer.model';
import { AccountsService } from '../services/accounts.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-bank-acounts',
  templateUrl: './bank-acounts.component.html',
  styleUrls: ['./bank-acounts.component.css']
})
export class BankAcountsComponent implements OnInit {
  newAccountFormGroup! : FormGroup;
  customerId! : string ;
  constructor(private accountService : AccountsService, private route : ActivatedRoute, private fb : FormBuilder, private customerService:CustomerService, private router:Router) { }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.newAccountFormGroup=this.fb.group({
      balance : this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      rate : this.fb.control(null,[Validators.required]),
      accountType : this.fb.control(null,[Validators.required]),
      idCustomer :this.fb.control(this.customerId)
    });
  }

  handleSaveAccount() {
    let account:AccountDetails=this.newAccountFormGroup.value;
    alert(account.balance)
    alert(account.rate)
    alert(account.accountType);
    alert(account.idCustomer);
     this.accountService.saveAccount(account).subscribe({
      next : data=>{
        alert("Account has been successfully created!");
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl("/customers");
      },
      error : err => {
        console.log(err);
      }
    }); 
  }
}