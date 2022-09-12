import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function print(quality = 1) {
    let naziv = document.getElementById("nepotrebniPDF");
    let filename = 'mockup.pdf';
    if (naziv != null && naziv !== "") {
        filename = naziv.getAttribute("name") + ".pdf";
    }

    html2canvas(document.querySelector('#glavni'), { scale: quality }).then(function (canvas) {
        //let pdf = new jsPDF('p', 'mm', 'a4');
        let pdf = new jsPDF('landscape');
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10);
        pdf.save(filename);
    });

}

export { print };