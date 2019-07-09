/**
 * tinymce plugin
 * Created by jerry on 16/8/5.
 */
tinymce.PluginManager.add('uploadimage', function (editor) {

    function selectLocalImages() {
        var dom = editor.dom;
        var input_f = document.createElement("input");
        input_f.type = "file";
        input_f.accept = "image/jpg,image/jpeg,image/png,image/gif";
        input_f.multiple = true;
        input_f.addEventListener('change', function (e) {
            console.log(input_f.files);

            //ajax提交表单 ajaxSubmit 只是表明用ajax方式提交这个form表单，并没有ajaxSubmit这个方法，具体提交要自己是想
            /* form.ajaxSubmit({
                success: function (data) {
                    if (data && data.file_path) {
                        editor.focus();
                        data.file_path.forEach(function (src) {
                            editor.selection.setContent(dom.createHTML('img', {src: src}));
                        })
                    }
                }
            }); */


            // editor.focus(); // 可以不用，会自动在光标处添加
            // editor.setContent("<p>editor.setContent</p>");
            // editor.insertContent("<span>editor.insertContent 添加图片成功</span>"); // 插入内容，插入一个
            // editor.insertContent("<p>editor.insertContent 添加图片成功</p>"); //
            // editor.selection.setContent('editor.selection.setContent 设置实例内容');
            // editor.selection.setContent("<span>添加图片成功</span>");
            tinymce.activeEditor.setProgressState(true);

            setTimeout(() => {
                editor.insertContent("<p><img src='../../displaytable-cell等高/1.png'></p>"); //
                editor.insertContent("<p><img src='../../displaytable-cell等高/1.png'></p>"); //
                editor.insertContent("<p><img src='../../displaytable-cell等高/1.png'></p>"); //
                editor.insertContent("<p><img src='../../displaytable-cell等高/1.png'></p>"); //
                tinymce.activeEditor.setProgressState(false);
            }, 10000);

        });

        input_f.click();
    }

    editor.addCommand("mceUploadImageEditor", selectLocalImages);

    editor.addButton('uploadimage', {
        icon: 'image',
        tooltip: '上传图片',
        onclick: selectLocalImages
    });

    editor.addMenuItem('uploadimage', {
        icon: 'image',
        text: '上传图片',
        context: 'tools',
        onclick: selectLocalImages
    });
});