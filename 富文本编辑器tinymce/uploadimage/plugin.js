/**
 * tinymce plugin
 * Created by jerry on 16/8/5.
 */
tinymce.PluginManager.add('uploadimage', function (editor) {

    function selectLocalImages() {
        var dom = editor.dom;
        var upload_file_input = document.createElement("input");
        upload_file_input.type = "file";
        upload_file_input.accept = "image/jpg,image/jpeg,image/png,image/gif";
        upload_file_input.multiple = true;
        upload_file_input.addEventListener('change', function (e) {
            console.log(upload_file_input.files);
            console.log(editor.settings.upload_image_url);

            var formData = new FormData(); // files
            Array.from(upload_file_input.files).forEach(file => {
                formData.append("file", file);
            });

            tinymce.activeEditor.setProgressState(true);

            $.ajax({
                method: "post",
                url: editor.settings.upload_image_url,
                data: formData, // 由于http传输都是传输字符串的，但是一般来说，框架会自动处理。但是一旦关闭了框架的处理，就要我们手动处理
                processData: false, // 不处理数据 jq 会自动将data转化为查询字符串
                contentType: false, // 不设置内容类型 不设置content-type 浏览器会自动加（也会自动加边界）
                success(data) {
                    tinymce.activeEditor.setProgressState(false);
                    console.log(data.files);
                    data.files.forEach(file => {
                        console.log("===")
                        console.log("file",file);
                        editor.insertContent("<p><img src='./img/" + file.filename + "'></p>");
                    })
                },
                error(err) {
                    tinymce.activeEditor.setProgressState(false);
                    console.error(err);
                }
            })

            //ajax提交表单 ajaxSubmit 只是表明用ajax方式提交这个form表单，并没有ajaxSubmit这个方法，具体提交要自己实现
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


            /* // editor.focus(); // 可以不用，会自动在光标处添加
            // editor.setContent("<p>editor.setContent</p>");
            // editor.insertContent("<span>editor.insertContent 添加图片成功</span>"); // 插入内容，插入一个
            // editor.insertContent("<p>editor.insertContent 添加图片成功</p>"); //
            // editor.selection.setContent('editor.selection.setContent 设置实例内容');
            // editor.selection.setContent("<span>添加图片成功</span>"); */


            /* tinymce.activeEditor.setProgressState(true);
            setTimeout(() => {
                editor.insertContent("<p><img src='../../displaytable-cell等高/1.png'></p>"); //
                editor.insertContent("<p><img src='../../displaytable-cell等高/1.png'></p>"); //
                editor.insertContent("<p><img src='../../displaytable-cell等高/1.png'></p>"); //
                editor.insertContent("<p><img src='../../displaytable-cell等高/1.png'></p>"); //
                tinymce.activeEditor.setProgressState(false);
            }, 1000); */

        });

        upload_file_input.click();
    }

    editor.addCommand("mceUploadImageEditor", selectLocalImages);

    editor.addButton('uploadimage', {
        icon: 'image',
        tooltip: '上传图片(多选)',
        onclick: selectLocalImages
    });

    editor.addMenuItem('uploadimage', {
        icon: 'image',
        text: '上传图片(多选)',
        context: 'tools',
        onclick: selectLocalImages
    });
});