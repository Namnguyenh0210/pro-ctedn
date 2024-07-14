document.getElementById("butlhe").addEventListener("click", function() {
    var hoten = document.getElementById("hoten").value;
    var email = document.getElementById("email").value;
    var sodienthoai = document.getElementById("sodienthoai").value;
    var diachi = document.getElementById("diachi").value;
    var loinhan = document.getElementById("loinhan").value;

    if (hoten && email && sodienthoai && diachi && loinhan) {
       alert("Đã gửi liên hệ thành công !");
    } else {
        alert("Vui lòng điền đầy đủ thông tin !");
       
    }
});
