import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { UserServices } from '../../../provider/user.services';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  settings = {
    editable:false,
    actions:{
      add: false,
      edit:false,
    },
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      _id: {
        title: 'ID',
        type: 'number',
      },
      fullName: {
        title: 'Name',
        type: 'string',
      },
      mobile: {
        title: 'Mobile',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },

      isAccountActive: {
        title: 'Status',
        type: 'Boolean',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  public customersList: any = []
  public productList: any = []



  constructor(private service: SmartTableData, private _userServices: UserServices,) {
    // const data = this.service.getData();
    // this.source.load(data);
    // console.log(data)

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCustomerList()
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getCustomerList() {
    this._userServices.fetchCustomersList().subscribe((data: any) => {
      console.log(data, "data")
      if (data.length !== 0) {
        this.customersList = data.UserList;
        console.log("this.customersList",this.customersList)

        this.customersList.forEach((cus)=>{
            cus._id = cus._id.slice(0,10);
            cus.fullName= (cus.fullName == '') ?  "-" : cus.fullName;
            cus.email = (cus.email == undefined || cus.email == '' ) ?  "-" : cus.email;
            cus.mobile=(cus.mobile == '') ?  "-" : cus.mobile;
            cus.isAccountActive =(cus.isAccountActive == true) ?  "Active" : "Deactive";

        })



        this.source.load(this.customersList);
      }
    });
  }

}
