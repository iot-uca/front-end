<template>

  <!-- Modal for editing action details -->

  <div v-if="showModalForActionEditing">
      <div class="modal-mask">
        <div class="modal-wrapper">

          <div class="modal-dialog modal-lg">
            <div class="modal-content">

                <div class="modal-header">
                  <h4 class="modal-title" id="editActionModalTitle"><strong>Action details</strong></h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModalForActionEditing()">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div class="modal-body">

                  <ul class="nav nav-tabs" id="editActionTab" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link active" id="editActionName-tab" data-toggle="tab" href="#editActionName" role="tab" aria-controls="editActionName" aria-selected="true">Action name</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="editHttpRequest-tab" data-toggle="tab" href="#editHttpRequest" role="tab" aria-controls="editHttpRequest" aria-selected="false">HTTP request</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="editActionBody-tab" data-toggle="tab" href="#editActionBody" role="tab" aria-controls="editActionBody" aria-selected="false">Body</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" id="editActionHeader-tab" data-toggle="tab" href="#editActionHeader" role="tab" aria-controls="editActionHeader" aria-selected="false">Headers</a>
                    </li>
                  </ul>

                  <div class="tab-content" id="editActionContent">

                    <div class="tab-pane fade show active" id="editActionName" role="tabpanel" aria-labelledby="editActionName-tab">
                      <div class="mb-3">
                        <label for="actionName">Name</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-font"></i></span>
                          </div>
                          <input type="text" class="form-control" id="actionName" v-model="activeAction.name" required="true">
                          <div class="invalid-feedback" style="width: 100%;">
                            The Action name is required.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="tab-pane fade" id="editHttpRequest" role="tabpanel" aria-labelledby="editHttpRequest-tab">

                      <div class="mb-3">
                        <label for="httpMethod">Method</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-star-o"></i></span>
                          </div>
                          <select class="form-control custom-select" id="httpMethod" v-model="activeAction.http_request.request_line.method" required="true">
                            <option v-for="(method, index) in existingHttpMethods" v-bind:value="method.name">
                              {{method.name}}
                            </option>
                          </select>
                          <div class="invalid-feedback" style="width: 100%;">
                            The HTTP Method is required.
                          </div>
                        </div>
                      </div>

                      <div class="mb-3">
                        <label for="actionUrl">URL</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-external-link"></i></span>
                          </div>
                          <input type="text" class="form-control" id="actionUrl" v-model="activeAction.http_request.request_line.url" required="true">
                          <div class="invalid-feedback" style="width: 100%;">
                            The Action url is required.
                          </div>
                        </div>
                      </div>

                      <div class="mb-3">
                        <label for="actionVersion">Version</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-code"></i></span>
                          </div>
                          <input type="text" class="form-control" id="actionVersion" v-model="activeAction.http_request.request_line.version" required="true">
                          <div class="invalid-feedback" style="width: 100%;">
                            The Action name is required.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="tab-pane fade" id="editActionBody" role="tabpanel" aria-labelledby="editActionBody-tab">

                      <div class="mb-3">
                        <label>Body</label>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fa fa-code"></i></span>
                          </div>
                          <textarea class="form-control" aria-label="Request body" v-model="activeAction.body"></textarea>
                        </div>
                      </div>

                      <div class="mb-3">
                        <div v-if="validJson" class="alert alert-success text-center py-2" role="alert">
                          JSON entered is valid
                        </div>
                        <div v-else class="alert alert-danger text-center py-2" role="alert">
                          JSON entered is invalid
                        </div>
                      </div>

                    </div>

                    <div class="tab-pane fade" id="editActionHeader" role="tabpanel" aria-labelledby="editActionHeader-tab">

                      <div class="row">
                          <button class="btn btn-info btn-sm" style="float:right;"  @click="addOneMoreElemForActionRequestHeader()"><strong>Add parameter</strong></button>
                      </div>

                      <div class="row" v-for="(elem, index) in activeAction.http_request.headers">

                        <div class="col-md-5">
                          <div class="mb-3">
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fa fa-key"></i></span>
                              </div>
                              <input type="text" class="form-control" v-model="elem.key">
                            </div>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="mb-3">
                            <div class="input-group">
                              <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fa fa-pencil-square-o"></i></span>
                              </div>
                              <input type="text" class="form-control" v-model="elem.value">
                            </div>
                          </div>
                        </div>

                        <div class="col-md-1">
                          <div class="mb-3">
                            <label></label>
                            <button type="button" class="btn btn-sm btn-danger" @click="oneLessElemForActionRequestHeader(index)"><strong><i class="fa fa-remove"></i></strong></button>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal"  @click="updateAction();hideModalForActionEditing();"><strong>Save changes</strong></button>
                </div>


                </div>
              </div>
            </div>
          </div>
        </div>


</template>

<script>

  export default {

    computed: {

      showModalForActionEditing(){
        return this.$store.state.showModalForActionEditing;
      },

      existingHttpVersions() {
        return this.$store.state.existingHttpVersions;
      },

      activeAction() {
        return this.$store.state.activeAction;
      },

      existingHttpMethods() {
        return this.$store.state.existingHttpMethods;
      },

      activeIdsForHttpRequestHeader() {
        return this.$store.state.activeIdsForHttpRequestHeader;
      },

      actionBody: {
        // getter
        get: function () {
          return this.$store.state.actionBody;
        },
        // setter
        set: function (newValue) {
          this.$store.dispatch('setActionBody', newValue);
        }
      },

      validJson() {
        return this.$store.state.validJson;
      }

    },

    methods: {

        addOneMoreElemForActionRequestHeader: function () {
          this.$store.dispatch('addOneMoreElemForActionRequestHeader');
        },

        oneLessElemForActionRequestHeader: function (index) {
          this.$store.dispatch('oneLessElemForActionRequestHeader', index);
        },

        updateAction: function () {
            this.$store.dispatch('updateAction');
        },

        hideModalForActionEditing: function() {
          this.$store.dispatch('hideModalForActionEditing');
        },

    }
  }

</script>

<style scoped>

.modal-mask {
position: fixed;
z-index: 9998;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, .5);
display: table;
transition: opacity .3s ease;
}

.modal-wrapper {
display: table-cell;
vertical-align: middle;
}

</style>
