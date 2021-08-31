<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <title>MR DIY System</title>
        <link rel="shortcut icon" href="<?=base_url()?>assets/images/logo.ico" />

        
        <link href="<?=base_url()?>assets/css/bootstrap.min.css" id="bootstrap-style" rel="stylesheet" type="text/css" />
        <!-- Icons Css -->
        <link href="<?=base_url()?>assets/css/icons.min.css" rel="stylesheet" type="text/css" />
        <!-- App Css-->
        <link href="<?=base_url()?>assets/css/app.min.css" id="app-style" rel="stylesheet" type="text/css" />
    </head>
    <div class="account-pages my-1 pt-sm-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <!-- <?=$warning?> -->
                    <!-- <div class="text-center">
                    &nbsp;
                    </div> -->
                    <div class="card overflow-hidden">
                        <div class="card-body pt-0">
                        <div class="text-center">
                            <img src="<?=base_url('assets/images/mrdiy_logo.png') ?>" height="100">
                        </div>
                                <h4 class="text-muted font-size-18 mb-1 text-center">MR.DIY</h4>
                                <p class="text-muted text-center">Sign in to continue to system.</p>
                            <div class="p-3">
                                <form class="lobi-form login-form visible" method="post" action="<?=base_url()?>auth/Login/DoLogin" enctype="multipart/form-data">
                                    <div class="form-group">
                                        <label for="username">Username</label>
                                        <input type="text" name="username" class="form-control" id="username" placeholder="Enter username">
                                    </div>
                                    <div class="form-group">
                                        <label for="userpassword">Password</label>
                                        <input type="password" name="password" class="form-control" id="userpassword" placeholder="Enter password">
                                    </div>
                                    <div class="form-group row mt-4">
                                        <div class="col-6">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="customControlInline">
                                                <label class="custom-control-label" for="customControlInline">Remember me
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-6 text-right">
                                            <button class="btn btn-primary w-md waves-effect waves-light" type="submit">Log In</button>
                                        </div>
                                    </div>
                                    <div class="form-group mb-0 row">
                                        <div class="col-12 mt-4">
                                            <a href="pages-recoverpw.html" class="text-muted"><i class="mdi mdi-lock"></i> Forgot your password?</a>
                                        </div>
                                    </div>
                                   
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 text-center">
                        <p style="color:black;">&copy; <?=date('Y')?> <i class="mdi mdi-heart text-danger"></i> by PT PESONA SOLUSINDO </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <script src="<?=base_url()?>assets/libs/jquery/jquery.min.js"></script>
        <script src="<?=base_url()?>assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="<?=base_url()?>assets/libs/metismenu/metisMenu.min.js"></script>
        <script src="<?=base_url()?>assets/libs/simplebar/simplebar.min.js"></script>
        <script src="<?=base_url()?>assets/libs/node-waves/waves.min.js"></script>
        <script src="<?=base_url()?>assets/libs/jquery-sparkline/jquery.sparkline.min.js"></script>
        <!-- App js -->
        <script src="<?=base_url()?>assets/js/app.js"></script>

    </body>
</html>
