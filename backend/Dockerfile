# ใช้ Node.js เวอร์ชันล่าสุดเป็น Base Image
FROM node:18

# กำหนด Working Directory
WORKDIR /app

# คัดลอกไฟล์ทั้งหมดไปยัง Container
COPY package*.json ./
COPY . .

# ติดตั้ง Dependencies
RUN npm install

# เปิดพอร์ตสำหรับ API
EXPOSE 3000

# รันแอปพลิเคชัน
CMD ["node", "index.js"]
