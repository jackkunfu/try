import config from '@/basic/config.js'
import OSS from 'ali-oss';

const upFile = {
    data() {
        return {
            fileList: [],
            upImgSize: 0.5, // 上传图片大小，这里默认， 具体页面不同的组件里在data里重新赋值，组件的优先级比较高
            upImgUrl: config.upImgUrl,
            upImgData: {
                biz: 'vendor'
            },
            
            imageUrl: '',
            isWithCookie: true, // 上传是否带cookie
            isMultiple: false // 是否允许多个
        }
    },
    methods: {
        beforeUpload() {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < this.upImgSize;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过' + this.this.upImgSize + 'MB!');
            }
            // this.fileList = [];
            return isJPG && isLt2M;
        },
        upOssBefore(){
            return true
        },
        upOss(file){
            if(!this.upOssBefore) return
            console.log(file)
            var client = new OSS.Wrapper({
                accessKeyId: 'vh2jGnE125bcoVuZ',
                accessKeySecret: 'Ndt2mvNChEovRz0AsjJLIsZKy5etYM',
                // stsToken: result.SecurityToken,
                endpoint: 'http://oss-cn-hangzhou.aliyuncs.com',
                bucket: 'prd-static-image-files'
            });
            return client.multipartUpload('Saas2/'+file.name, file).then(function (result) {
                return file.name
            }).catch(function (err) {
                console.log(err);
            });
        },
        upOssMore(files){
            return Promise.all(Array.prototype.map.call(files, element => {
                return this.upOss(element)
            }))
            // var arr = []
            // return Array.prototype.map.call(files, element => {
            //     return this.upOss(element)
            // })
        }
    }
}

export default upFile
