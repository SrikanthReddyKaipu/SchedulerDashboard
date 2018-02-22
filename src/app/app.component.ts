import { Component, Input, OnInit, Renderer2, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { AdhocScedularDataService } from './app.service';
import { SelectItem } from 'primeng/primeng';
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterContainerComponent, ToasterService, Toast, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToasterService]
})
export class AppComponent {
  adhocData: any;
  selectedExtract_nm: string;
  selectedData: any;
  extractNameList: Array<SelectItem> = [];
  loading: boolean = false;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-center',
    limit: 1
  });

  editForm: FormGroup;
  @ViewChild('AdhocSchedulerDashboardFormModal') AdhocSchedulerDashboardFormModalElement: ElementRef;
  @ViewChild('AdhocSchedulerDashboardFormBackDrop') AdhocSchedulerDashboardFormBackDropElement: ElementRef;
  @Output() onClose = new EventEmitter<any>();

  constructor(private _service: AdhocScedularDataService,
    private renderer: Renderer2,
    private fb: FormBuilder,
    public toasterService: ToasterService) {


  }

  ngOnInit() {
    this.getAdhocData();
    this.editForm = this.fb.group({
      extract_id: [''],
      extract_nm: ['', [Validators.required]],
      dist_list: ['', [Validators.required]]

    });
  }


  getAdhocData() {

    this.extractNameList = [];
    return this._service.getAdhocSchedulerData()
      .subscribe((res) => {
        this.adhocData = res;
        this.extractNameList = res.map((extractNames, index) => {
          return { 'value': extractNames.extract_nm, 'label': extractNames.extract_nm };
        });

      });
  }




  onExtractIdSelect(value: any) {
    this.selectedData = this.adhocData.filter(x => x.extract_nm === value);
  }

  editAdhocList(document: any, i: any) {
    this.editForm.get('extract_id').setValue(this.selectedData[i].extract_id);
    this.editForm.get('extract_nm').setValue(this.selectedData[i].extract_nm);
    this.editForm.get('dist_list').setValue(this.selectedData[i].dist_list);
    const hostElem = this.AdhocSchedulerDashboardFormModalElement.nativeElement;
    this.openModal(hostElem);
  }

  onSubmit(value) {
    this.loading = true;
    this._service.updateAdhocSchedulerData(value.value.extract_id, value.value)
      .subscribe((res) => {
        if (res._body === "Ok") {
          this.getAdhocData();
          setTimeout(() => {
            this.onExtractIdSelect(this.editForm.value.extract_nm);
            this.closeModal();
            this.loading = false;
            this.successMsgToaster();
          }, 6000);
        }
      });
  }

  successMsgToaster() {
    var toast: Toast = {
      type: 'success',
      title: 'Submitted Successfully',
    };
    this.toasterService.pop(toast);
  }



  closeModal() {
    let hostElem = this.AdhocSchedulerDashboardFormModalElement.nativeElement;
    //set display:none to hide the modal
    this.renderer.setStyle(hostElem, "display", "none");
    this.renderer.setAttribute(hostElem, "class", "modal fade");
    //set display:none to hide the backdrop
    this.renderer.setAttribute(this.AdhocSchedulerDashboardFormBackDropElement.nativeElement, "class", "modal-backdrop fade");
    this.renderer.setStyle(this.AdhocSchedulerDashboardFormBackDropElement.nativeElement, "display", "none");

    this.onClose.emit('closed');
  }
  openModal(hostElem: any) {
    //set display:block to show the modal
    this.renderer.setStyle(hostElem, "display", "block");
    this.renderer.setAttribute(hostElem, "class", "modal fade in");
    //set display:block to show the backdrop
    this.renderer.setAttribute(this.AdhocSchedulerDashboardFormBackDropElement.nativeElement, "class", "modal-backdrop fade in");
    this.renderer.setStyle(this.AdhocSchedulerDashboardFormBackDropElement.nativeElement, "display", "block");
  }

}
