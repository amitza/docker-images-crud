import {
    CollectionProperties,
    Expose
  } from '@forlagshuset/nestjs-mongoose-paginate';
  
  export class DeploymentsCollectionProperties extends CollectionProperties {
    @Expose({ name: 'createdAt', sortable: true })
    readonly createdAt: 'desc' ;

    readonly unsortable: string;
  }