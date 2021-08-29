<div class="error-page error-404">
  <h1 class="error-page-code animated pulse"><i class="fa fa-warning"></i> Error 404</h1>
  <h1 class="error-page-text">Halaman tidak ditemukan</h1>
  <p class="error-page-subtext">Halaman yang anda akses tidak ditemukan.</p>
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