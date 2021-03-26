/** 需要运行在浏览器中 */
function exportExcel() {
  // 填上token
  const userToken = '';
  // 下载接口
  const url = "";
  // 发起请求
  const xhr = new XMLHttpRequest();
  xhr.open('post', url, true);
  // 添加请求头
  xhr.setRequestHeader('Authorization', userToken);
  // 添加响应类型
  xhr.responseType = 'blob';
  xhr.onload = function onload() {
    if (this.status === 200) {
      const url = window.URL.createObjectURL(
        new Blob([this.response], { type: 'application/vnd.ms-excel;charset=utf-8' }),
      );
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      const fileName = `file.xlsx`;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      /* 下载完成进行释放 */
      window.URL.revokeObjectURL(url);
    } else if (this.status === 500) {
      console.error('导出失败，请稍后尝试！');
    }
  };
  xhr.send();
}

// exportExcel();