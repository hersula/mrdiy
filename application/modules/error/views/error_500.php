<div class="error-page error-500">
  <h1 class="error-page-code animated pulse"><i class="fa fa-times-circle"></i> Error 500</h1>
  <h1 class="error-page-text">Terdapat kesalahan</h1>
  <p class="error-page-subtext">Terdapat kesalahan pada saat membuka halaman. Kami akan berusaha untuk memperbaiki permasalahan ini.</p>
  <p class="error-page-subtext">Coba lagi beberapa saat atau <a href="mailto:theadamz91@gmail.com">hubungi administrator</a>.</p>
  <ul class="error-page-actions">
    <li>
      <a href="javascript:void(0)" data-func="go-back" class="btn btn-primary btn-outline">
        <i class="fa fa-arrow-left"></i>
        Kembali!</a>
    </li>
    <li>
      <a href="#<?=$this->session->userdata('def_menu_link')?>" class="btn btn-primary btn-outline">
        <i class="fa fa-home"></i>
        Menu Utama</a>
    </li>
  </ul>
</div>
<script>
  $('.error-page [data-func="go-back"]').click(function (ev) {
    window.history.back();
  });
</script>