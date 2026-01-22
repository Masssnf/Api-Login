package main

import (
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)


type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func main() {
	r := gin.Default()

	hashedPass, _ := bcrypt.GenerateFromPassword([]byte("123456789"), 10)

	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" { c.AbortWithStatus(204); return }
		c.Next()
	})

	r.POST("/login", func(c *gin.Context) {
		var input User
		c.BindJSON(&input)

		err := bcrypt.CompareHashAndPassword(hashedPass, []byte(input.Password))
		
		if input.Username == "admin" && err == nil {
		
			c.JSON(200, gin.H{
				"status": "sukses",
				"hash_asli": string(hashedPass),
			})
		} else {
			c.JSON(401, gin.H{"error": "Gagal"})
		}
	})

	r.Run(":8080")
}