<template>
    <!-- <div class="container"> -->
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card py-4">
                    <div class="card-header mb-4">
                        <h2>Excel Import Demo [Laravel 9 - VueJS 3] </h2>
                    </div>
                    <div class="card-body">
                        <!-- <div v-if="success != ''" class="alert alert-success"> -->
                        <div v-if="alertMsg != ''" class="alert alert-success" :class = "isImportComplete==1?'alert alert-success':'alert alert-danger'">
                            {{ alertMsg }}
                        </div>
                        <form @submit="formSubmit" enctype="multipart/form-data">
                            <input ref="fileupload" type="file" class="form-control" v-on:change="onChange" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
                            <button class="btn btn-primary mt-2" :disabled="isLoading">
                                <span v-if="isLoading" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                Upload
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    <!-- </div> -->
</template>
<script>
    export default {
        data() {
            return {
                name: '',
                file: '',
                success: 0,
                isImportComplete: 0,
                isLoading: false,
                alertMsg: ''
            };
        },
        methods: {
            onChange(e) {
                this.file = e.target.files[0];
            },
            formSubmit(e) {
                e.preventDefault();
                this.isImportComplete = 0;
                let existingObj = this;
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }
                let data = new FormData();
                data.append('file', this.file);
                this.isLoading = true;
                axios.post('/file-import', data, config)
                    .then(function (res) {
                        existingObj.success = res.data.success;
                    })
                    .catch(function (err) {
                        // console.log(err.response.data.message)
                        var errMsg = ""
                        if (err.response.data.message.search("users_email_unique") != -1) {
                            errMsg = "Entry for \"email\" in first row already exists. Please provide a different email and try again."
                        }
                        else if (err.response.data.message.search("23000") != -1) {
                            errMsg = "Entry for \"code\" already exists. Please provide different value(s) and try again."
                        }
                        if (existingObj.file == "" || existingObj.file == null) {
                            errMsg = "File not selected. Please select a file and then click Import."
                        }
                        existingObj.alertMsg = 'Error!\n'+errMsg;
                    })
                    .finally(() => {
                        this.isLoading = false
                        if (existingObj.success == 1) {
                            // console.log("Data uploaded !");
                            existingObj.alertMsg = '';
                            existingObj.alertMsg = 'Success! Import job completed.';
                            existingObj.success = 0;
                            existingObj.isImportComplete = 1;
                            existingObj.file = '';
                            existingObj.$refs.fileupload.value=null;
                        }
                    });
            }
        }
    }
</script>
