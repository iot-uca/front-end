<template>

  <!-- Modal for showing action details -->
  <div class="modal fade" id="showActionDetailModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">

        <div class="modal-header">
          <h4 class="modal-title" id="exampleModalLabel"><strong>Action details</strong></h4>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">

          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Action name</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">HTTP request</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Body</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="newone-tab" data-toggle="tab" href="#newone" role="tab" aria-controls="newone" aria-selected="false">Headers</a>
            </li>
          </ul>

          <div class="tab-content" id="myTabContent">

            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div class="mb-3">
                <label for="actionName">Name</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-font"></i></span>
                  </div>
                  <input disabled type="text" class="form-control" id="actionName" v-model="activeAction.name">

                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

              <div class="mb-3">
                <label for="httpMethod">Method</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-star-o"></i></span>
                  </div>
                  <select disabled class="form-control custom-select" id="httpMethod" v-model="activeAction.method">
                    <option v-for="(method, index) in existingHttpMethods" v-bind:value="method.name">
                      {{method.name}}
                    </option>
                  </select>
                </div>
              </div>

              <div class="mb-3">
                <label for="actionUrl">URL</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-external-link"></i></span>
                  </div>
                  <input disabled type="text" class="form-control" id="actionUrl" v-model="activeAction.url">

                </div>
              </div>

              <div class="mb-3">
                <label for="actionVersion">Version</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-code"></i></span>
                  </div>
                  <input disabled type="text" class="form-control" id="actionVersion" v-model="activeAction.version">
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">

                <!--  FIXME => DEBERIA MOSTART EL JSON, Y NO KEY-VALUE  -->

              <!--div class="row" v-for="(elem, index) in activeIdsForHttpRequestBody">

                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="triggerName">Key</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-key"></i></span>
                      </div>
                      <input disabled type="text" class="form-control" v-model="elem.key">
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="triggerName">Value</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-pencil-square-o"></i></span>
                      </div>
                      <input disabled type="text" class="form-control" v-model="elem.value">
                    </div>
                  </div>
                </div>

              </div-->

            </div>

            <div class="tab-pane fade" id="newone" role="tabpanel" aria-labelledby="newone-tab">

              <div class="row" v-for="(elem, index) in activeIdsForHttpRequestHeader">

                <div class="col-md-6">
                  <div class="mb-3">
                    <label>Key</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-key"></i></span>
                      </div>
                      <input disabled type="text" class="form-control" v-model="elem.key">
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="mb-3">
                    <label>Value</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-pencil-square-o"></i></span>
                      </div>
                      <input disabled type="text" class="form-control" v-model="elem.value">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>

  export default{

    computed:{

      existingHttpVersions(){
        return this.$store.state.existingHttpVersions;
      },

      activeAction(){
        return this.$store.state.activeAction;
      },

      existingHttpMethods(){
        return this.$store.state.existingHttpMethods;
      },

      activeIdsForHttpRequestHeader(){
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

    methods:{

    }
  }

</script>

<style scoped>


</style>
