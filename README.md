# Vuexy - Vuejs, React, HTML & Laravel Admin Dashboard Template

**Vuexy – Vuejs, React, HTML & Laravel Admin Dashboard Template** – is the most developer friendly & highly customizable Admin Dashboard Template based on Bootstrap 4, Bootstrap Vue & Reactstrap.

## การเข้าถึงข้อมูล deptid

### วิธีที่ 1: เข้าถึงจาก Vuex store

```javascript
// ในคอมโพเนนต์ Vue
this.$store.state.auth.deptid

// หรือใช้ getter
this.$store.getters['auth/deptid']
```

### วิธีที่ 2: เข้าถึงจาก localStorage

```javascript
const userData = JSON.parse(localStorage.getItem('userData'))
const deptid = userData.deptid
```

### หมายเหตุ
ข้อมูล deptid จะถูกบันทึกหลังจากการ login สำเร็จ และจะถูกลบเมื่อ logout
