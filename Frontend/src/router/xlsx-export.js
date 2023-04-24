async function exportExonDataToExcel() {
    try {
      const response = await axios.get(`https://rest.ensembl.org/overlap/id/a9671ce1-921e-5f6e-ab41-a4ce9d2f4343?feature=exon;content-type=application/json`);
      const exons = response.data.map((exon) => ({
        id: exon.id,
        start: exon.start,
        end: exon.end,
      }));
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exons);
      XLSX.utils.book_append_sheet(wb, ws, 'Exon Data');
      XLSX.writeFile(wb, 'exon_data.xlsx');
      alert('Exon data exported successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to export exon data.');
    }
    console.log('Getting exon data from server...');
    const response = await axios.get(`https://rest.ensembl.org/overlap/id/a9671ce1-921e-5f6e-ab41-a4ce9d2f4343?feature=exon;content-type=application/json`);
    console.log('Exon data retrieved:', response.data);
  }
  