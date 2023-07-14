package routes

import (
	"back/controller/form"
	"back/middleware"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
)

type User struct {
	Text string `json:"text"`
}
type fileName struct {
	FileName string `json:"fileName"`
	FileType string `json:"fileType"`
}
type formDataType struct {
	FormData []map[string]string `json:"formData"`
	FormCol  []form.FormColItem  `json:"formCol"`
}

func SetRouter() *gin.Engine {
	router := gin.Default()
	router.Use(middleware.Cors())
	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"msg": "服务启动成功"})
	})
	router.POST("/postspeech", func(c *gin.Context) {
		var json User
		err := c.ShouldBind(&json)

		if err == nil {
			fmt.Printf("%v\n", &json)
			c.JSON(http.StatusOK, gin.H{
				"msg":    json.Text,
				"status": 1,
				"data":   "succeed",
			})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{
				"msg":    "failed",
				"status": 0,
				"data":   "failed",
			})
		}

	})
	router.POST("/postformdata", func(c *gin.Context) {
		//c.Header("Access-Control-Allow-Origin", "*")                                                            // 指明哪些请求源被允许访问资源，值可以为 "*"（允许访问所有域），"null"，或者单个源地址。
		//c.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token") // 对于预请求来说，指明了哪些头信息可以用于实际的请求中。
		//c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")                                          // 对于预请求来说，哪些请求方式可以用于实际的请求。
		////c.Header("Access-Control-Expose-Headers", "*")
		//c.Header("Access-Control-Expose-Headers", "charset, Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type") // 对于预请求来说，指明哪些头信息可以安全的暴露给 CORS API 规范的 API
		//c.Header("Access-Control-Allow-Credentials", "true")

		file, err := c.FormFile("file")
		if err == nil {
			c.SaveUploadedFile(file, "formdata/"+file.Filename)
			c.JSON(http.StatusOK, gin.H{
				"msg":    "succeed",
				"status": 1,
				"data":   "upload succeed",
			})
		} else {
			c.JSON(http.StatusBadRequest, gin.H{
				"msg":    "failed",
				"status": 0,
				"data":   "upload failed",
			})
		}
	})

	router.POST("/getformdata", func(c *gin.Context) {
		var jsons fileName
		err := c.ShouldBind(&jsons)
		filePath := "./formdata/" + jsons.FileName
		if err == nil {
			fmt.Println(filePath)

			formDatas, formCols, isRead := form.HandleForm(filePath, jsons.FileType)
			if isRead == true {
				var data = formDataType{FormData: formDatas, FormCol: formCols}
				c.JSON(http.StatusOK, gin.H{
					"msg":    "succeed",
					"status": 1,
					"data":   data,
				})
			} else {
				c.JSON(http.StatusOK, gin.H{
					"msg":    "failed",
					"status": 1,
					"data":   nil,
				})
			}

		} else {
			c.JSON(http.StatusBadRequest, gin.H{
				"msg":    "failed",
				"status": 0,
				"data":   "failed",
			})
		}
	})

	router.DELETE("/deleteform", func(c *gin.Context) {
		//var json fileName
		str, ok := c.GetQuery("fileName")
		if ok == true {
			fmt.Printf("%v\n", str)
			err := os.Remove("formdata/" + str)
			if err == nil {
				c.JSON(http.StatusOK, gin.H{
					"msg":    "succeed",
					"status": 1,
					"data":   "delete succeed",
				})
			}
		}
	})

	//err := routes.Run(":8080")
	//
	//if err != nil {
	//	fmt.Println("服务器启动失败！")
	//}

	return router
}
