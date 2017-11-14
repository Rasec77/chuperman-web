import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { animate } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { style } from "@angular/core";
import { transition } from "@angular/core";
import { trigger } from "@angular/core";


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})


export class TableListComponent implements OnInit {
  public orders;
  public ordenes: any;

  public keys: any;

  constructor(
    public db:AngularFireDatabase,
    private modalService:NgbModal
  ) { 
    
  }

  ngOnInit() {
    //console.log(this.GetOrders());
    this.GetOrders();
  }

  VerDetalle(modal){
    //id = this.orders;
    console.log(modal);
    this.modalService.open(modal);
  }

  public GetOrders(){
  /* this.db.list('/orders/').valueChanges().subscribe(items => {
      items.forEach(item => {
      Object.keys(item).map(key=>item[key]).map(order => {
      this.orders= order;

      console.log(this.orders);
              })
          })
      }) */

     this.db.list("/orders",
        query => query.orderByChild('status').equalTo('SOLICITADO')
      )//;

      //console.log(xd);

      //xd
      .valueChanges()
      .subscribe(order =>{
        this.orders = order;
        console.log(this.orders);
      })

      
  }


  public GetOrderbyId(keyorder){
    this.ordenes = null;
    this.db.list('/orders-details/'+keyorder).valueChanges().subscribe(
    // this.db.list("/orders-details", ref => ref.orderByChild("idpedido").equalTo(keyorder)).valueChanges().subscribe(
       orderfilter =>{
        this.ordenes = orderfilter; //Array.of(orderfilter);

        //let keys = Object.keys(this.ordenes);

        console.log(this.ordenes);
      }
     )
    
    }

    public finalizarbyId(keyorder){
      this.db.database.ref('/orders/'+keyorder).update({status:'FINALIZADO'})
      alert("Finalizado correctamente");
      }
    
    

}