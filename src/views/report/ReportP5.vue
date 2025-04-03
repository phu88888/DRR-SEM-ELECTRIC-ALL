<template>
  <div>
    <b-row>
      <b-col>
        <b-card
          style="background: #fff; width: 100%; border-radius: 10px"
        >
          <b-row>
            <b-col
              class="d-flex align-items-center justify-content-center mb-3"
              lg="12"
            >
              <h2 style="color: #000; font-weight: bold; text-align: center; font-size: 18px;">
                การวิเคราะห์พารามิเตอร์วิศวกรรมจราจรจากข้อมูลกล้อง CCTV ระยะเวลา 7 วัน
              </h2>
            </b-col>

            <b-col
              lg="12"
              class="mb-3"
            >
              <div class="section-container">
                <h3 class="section-title">
                  1. บทนำ (Introduction)
                </h3>
                <p class="section-text">
                  ระบบทำการเก็บข้อมูลโดยใช้กล้อง CCTV ตรวจนับและจำแนกยานพาหนะเป็นระยะเวลา 7 วัน โดยมีวัตถุประสงค์เพื่อวิเคราะห์ลักษณะการไหลของจราจร ประสิทธิภาพของถนน และระดับการให้บริการ การวิเคราะห์พารามิเตอร์ทางวิศวกรรมจราจรมีความสำคัญอย่างยิ่งต่อการวางแผนและพัฒนาโครงสร้างพื้นฐานด้านการคมนาคม
                </p>
                <p class="section-text">
                  <strong>ความสำคัญของการวิเคราะห์พารามิเตอร์ทางวิศวกรรมจราจร:</strong>
                </p>
                <ul class="data-list">
                  <li>การประเมินประสิทธิภาพของโครงข่ายถนนปัจจุบัน</li>
                  <li>การวางแผนและออกแบบการปรับปรุงโครงสร้างพื้นฐาน</li>
                  <li>การคาดการณ์ความต้องการในอนาคตและการรองรับการเติบโตของปริมาณจราจร</li>
                  <li>การจัดการจราจรและการลดความแออัด</li>
                  <li>การประเมินผลกระทบด้านสิ่งแวดล้อมและความปลอดภัย</li>
                </ul>
                <p class="section-text">
                  <strong>ข้อมูลพื้นฐานของพื้นที่ศึกษา:</strong> ถนน {{ road_name }} ({{ road_code }}) ตำบล/แขวง {{ amphoe }} จังหวัด {{ province }} ระยะทาง {{ distance_km }} กม. พิกัด ({{ latitude }}, {{ longitude }})
                </p>
              </div>
            </b-col>

            <b-col lg="12">
              <div class="section-container">
                <h3 class="section-title">
                  2. พารามิเตอร์และสูตรการคำนวณทางวิศวกรรมจราจร (Traffic Engineering Parameters and Formulas)
                </h3>

                <b-row>
                  <b-col
                    lg="6"
                    md="12"
                    class="mb-3"
                  >
                    <div class="calculation-section">
                      <h4 class="calculation-title">
                        2.1 Passenger Car Unit Factor (ค่าเทียบเท่าหน่วยรถยนต์นั่งส่วนบุคคล)
                      </h4>
                      <p class="section-text">
                        ค่า PCU Factor เป็นค่าที่ใช้ในการแปลงยานพาหนะประเภทต่างๆ ให้เป็นหน่วยมาตรฐานเดียวกัน เพื่อการวิเคราะห์ปริมาณจราจรที่มีความแม่นยำ ค่านี้คำนวณจากผลกระทบทางกายภาพและพฤติกรรมการขับขี่ของยานพาหนะแต่ละประเภทที่มีต่อการไหลของกระแสจราจร
                      </p>
                      <div class="text-container">
                        <p class="section-text">
                          <strong>ค่า PCU Factor สำหรับยานพาหนะแต่ละประเภท (ตามมาตรฐานกรมทางหลวง):</strong>
                        </p>
                        <table class="parameter-table">
                          <thead>
                            <tr>
                              <th>ประเภทยานพาหนะ</th>
                              <th>PCU Factor</th>
                              <th>หมายเหตุ</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>จักรยานยนต์ (Motorcycle)</td>
                              <td>0.25</td>
                              <td>มีผลกระทบน้อยต่อการไหลของจราจร</td>
                            </tr>
                            <tr>
                              <td>รถยนต์ส่วนบุคคล (Car)</td>
                              <td>1.0</td>
                              <td>หน่วยพื้นฐานในการเปรียบเทียบ</td>
                            </tr>
                            <tr>
                              <td>รถบรรทุก (Truck)</td>
                              <td>2.5</td>
                              <td>มีผลกระทบสูงเนื่องจากขนาดและความเร็วต่ำ</td>
                            </tr>
                            <tr>
                              <td>รถโดยสาร (Bus)</td>
                              <td>2.0</td>
                              <td>มีผลกระทบสูงเนื่องจากขนาดและการหยุดบ่อย</td>
                            </tr>
                            <tr>
                              <td>รถแท็กซี่ (Taxi)</td>
                              <td>1.0</td>
                              <td>มีลักษณะการใช้พื้นที่คล้ายรถยนต์ส่วนบุคคล</td>
                            </tr>
                            <tr>
                              <td>รถกระบะ (Pickup)</td>
                              <td>1.0</td>
                              <td>มีลักษณะการใช้พื้นที่คล้ายรถยนต์ส่วนบุคคล</td>
                            </tr>
                            <tr>
                              <td>รถพ่วง (Trailer)</td>
                              <td>2.5</td>
                              <td>มีผลกระทบสูงเนื่องจากขนาดและความเร็วต่ำ</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </b-col>

                  <b-col
                    lg="6"
                    md="12"
                    class="mb-3"
                  >
                    <div class="calculation-section">
                      <h4 class="calculation-title">
                        2.2 Average PCU (ปริมาณจราจรหน่วยรถยนต์นั่งส่วนบุคคลเฉลี่ย)
                      </h4>
                      <ul class="formula-list">
                        <li>
                          <span class="formula-definition">คำนิยาม:</span>
                          <span class="formula-equation">PCU<sub>avg</sub> = (∑PCU) / n</span>
                          <span class="formula-significance">โดยที่:</span>
                          <ul class="formula-variables">
                            <li>∑PCU คือผลรวมของปริมาณจราจรในหน่วย PCU ทั้งหมดในช่วงเวลาที่ศึกษา</li>
                            <li>n คือจำนวนวันที่เก็บข้อมูล (7 วัน)</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">นัยสำคัญทางวิศวกรรม:</span>
                          <ul class="formula-significance-list">
                            <li>ใช้เป็นตัวแทนของปริมาณจราจรทั่วไปในการวิเคราะห์และออกแบบถนน</li>
                            <li>เป็นพารามิเตอร์พื้นฐานในการคำนวณความจุและระดับการให้บริการของถนน</li>
                            <li>ใช้ในการเปรียบเทียบปริมาณจราจรระหว่างช่วงเวลาหรือพื้นที่ต่างๆ</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">การประยุกต์ใช้:</span>
                          <span class="formula-equation">ใช้ในการวางแผนการจัดการจราจร การออกแบบความจุของถนน และการประเมินผลกระทบด้านการจราจร</span>
                        </li>
                      </ul>
                    </div>
                  </b-col>

                  <b-col
                    lg="6"
                    md="12"
                    class="mb-3"
                  >
                    <div class="calculation-section">
                      <h4 class="calculation-title">
                        2.3 Annual Average Daily Traffic (ปริมาณจราจรเฉลี่ยต่อวันตลอดปี)
                      </h4>
                      <ul class="formula-list">
                        <li>
                          <span class="formula-definition">คำนิยาม:</span>
                          <span class="formula-equation">AADT = (∑V<sub>i</sub>) / n × CF</span>
                          <span class="formula-significance">โดยที่:</span>
                          <ul class="formula-variables">
                            <li>∑V<sub>i</sub> คือผลรวมของปริมาณจราจรทั้งหมดในช่วงเวลาที่ศึกษา</li>
                            <li>n คือจำนวนวันที่ทำการสำรวจ (7 วัน)</li>
                            <li>CF คือค่าปรับแก้ (Correction Factor) เท่ากับ 1.07 สำหรับข้อมูล 7 วัน</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">นัยสำคัญทางวิศวกรรม:</span>
                          <ul class="formula-significance-list">
                            <li>เป็นพารามิเตอร์พื้นฐานที่สำคัญในการวางแผนและออกแบบโครงสร้างพื้นฐานด้านการขนส่ง</li>
                            <li>ใช้ในการประเมินความต้องการใช้ถนนและการคาดการณ์การเติบโตของปริมาณจราจรในอนาคต</li>
                            <li>เป็นข้อมูลสำคัญในการจัดสรรงบประมาณสำหรับการบำรุงรักษาและปรับปรุงโครงข่ายถนน</li>
                            <li>ใช้ในการคำนวณอัตราการเกิดอุบัติเหตุและการประเมินความปลอดภัยของถนน</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">ที่มาของค่าปรับแก้ 1.07:</span>
                          <span class="formula-equation">ค่าปรับแก้ 1.07 เป็นค่าที่ใช้ในการประมาณค่า AADT จากข้อมูล 7 วันตามมาตรฐานของกรมทางหลวง เพื่อชดเชยความแปรปรวนของปริมาณจราจรตามฤดูกาลและช่วงเวลาต่างๆ ของปี</span>
                        </li>
                        <li>
                          <span class="formula-definition">การประยุกต์ใช้:</span>
                          <span class="formula-equation">ค่า AADT ที่สูงบ่งชี้ถึงความต้องการใช้ถนนที่สูง และอาจนำไปสู่การพิจารณาขยายช่องจราจรหรือปรับปรุงโครงสร้างพื้นฐาน</span>
                        </li>
                      </ul>
                    </div>
                  </b-col>

                  <b-col
                    lg="6"
                    md="12"
                    class="mb-3"
                  >
                    <div class="calculation-section">
                      <h4 class="calculation-title">
                        2.4 Maximum Traffic Volume (ปริมาณจราจรสูงสุด)
                      </h4>
                      <ul class="formula-list">
                        <li>
                          <span class="formula-definition">คำนิยาม:</span>
                          <span class="formula-equation">V<sub>max</sub> = max(V<sub>1</sub>, V<sub>2</sub>, ..., V<sub>7</sub>)</span>
                          <span class="formula-significance">โดยที่:</span>
                          <ul class="formula-variables">
                            <li>V<sub>1</sub>, V<sub>2</sub>, ..., V<sub>7</sub> คือปริมาณจราจรในแต่ละวัน</li>
                            <li>max() คือฟังก์ชันที่หาค่าสูงสุดจากชุดข้อมูล</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">นัยสำคัญทางวิศวกรรม:</span>
                          <ul class="formula-significance-list">
                            <li>ใช้ในการประเมินความต้องการสูงสุดของการใช้ถนนเพื่อการออกแบบความจุที่เหมาะสม</li>
                            <li>เป็นตัวบ่งชี้ถึงช่วงเวลาวิกฤติที่อาจเกิดความแออัดของการจราจร</li>
                            <li>ใช้ในการวางแผนการจัดการจราจรในช่วงที่มีปริมาณจราจรสูง</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">การประยุกต์ใช้ในการออกแบบ:</span>
                          <span class="formula-equation">ค่า V<sub>max</sub> มักใช้ในการออกแบบความจุของถนนโดยคำนึงถึงปัจจัยความปลอดภัย (Safety Factor) เพื่อรองรับสถานการณ์ที่อาจมีปริมาณจราจรสูงกว่าปกติ</span>
                        </li>
                      </ul>
                    </div>
                  </b-col>

                  <b-col
                    lg="6"
                    md="12"
                    class="mb-3"
                  >
                    <div class="calculation-section">
                      <h4 class="calculation-title">
                        2.5 Heavy Truck Percentage (ร้อยละรถบรรทุกหนัก)
                      </h4>
                      <ul class="formula-list">
                        <li>
                          <span class="formula-definition">คำนิยาม:</span>
                          <span class="formula-equation">%HT = (∑HT / ∑V) &times; 100</span>
                          <span class="formula-significance">โดยที่:</span>
                          <ul class="formula-variables">
                            <li>∑HT คือจำนวนรถบรรทุกหนักทั้งหมดในช่วงเวลาที่ศึกษา</li>
                            <li>∑V คือปริมาณจราจรทั้งหมดในช่วงเวลาเดียวกัน</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">นัยสำคัญทางวิศวกรรม:</span>
                          <ul class="formula-significance-list">
                            <li>ใช้ในการออกแบบโครงสร้างถนนให้รองรับน้ำหนักบรรทุกและการวางแผนการบำรุงรักษา</li>
                            <li>มีผลต่อการคำนวณค่า ESAL (Equivalent Single Axle Load) ซึ่งเป็นพารามิเตอร์สำคัญในการออกแบบความหนาของผิวทาง</li>
                            <li>ส่งผลต่อการประเมินอายุการใช้งานของผิวทาง เนื่องจากรถบรรทุกหนักมีผลกระทบต่อการเสื่อมสภาพของผิวทางมากกว่ารถยนต์ส่วนบุคคล</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">ความสัมพันธ์กับการออกแบบถนน:</span>
                          <span class="formula-equation">ตามมาตรฐานการออกแบบของกรมทางหลวง ถนนที่มีเปอร์เซ็นต์รถบรรทุกหนักสูงกว่า 10% จำเป็นต้องมีการออกแบบโครงสร้างทางพิเศษเพื่อรองรับน้ำหนักบรรทุกที่มากขึ้น</span>
                        </li>
                      </ul>
                    </div>
                  </b-col>

                  <b-col
                    lg="6"
                    md="12"
                    class="mb-3"
                  >
                    <div class="calculation-section">
                      <h4 class="calculation-title">
                        2.6 Maximum Speed (ความเร็วสูงสุด)
                      </h4>
                      <ul class="formula-list">
                        <li>
                          <span class="formula-definition">คำนิยาม:</span>
                          <span class="formula-equation">V<sub>max</sub> = max(v<sub>1</sub>, v<sub>2</sub>, ..., v<sub>n</sub>)</span>
                          <span class="formula-significance">โดยที่:</span>
                          <ul class="formula-variables">
                            <li>v<sub>1</sub>, v<sub>2</sub>, ..., v<sub>n</sub> คือความเร็วของยานพาหนะแต่ละคันที่ตรวจวัดได้</li>
                            <li>n คือจำนวนยานพาหนะทั้งหมดที่ตรวจวัด</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">นัยสำคัญทางวิศวกรรม:</span>
                          <ul class="formula-significance-list">
                            <li>ใช้ในการประเมินความปลอดภัยของถนนและการกำหนดความเร็วจำกัด</li>
                            <li>เป็นตัวบ่งชี้ถึงพฤติกรรมการขับขี่ที่อาจเป็นอันตรายและจุดเสี่ยงบนถนน</li>
                            <li>ใช้ในการออกแบบรัศมีโค้ง ระยะมองเห็น และองค์ประกอบทางเรขาคณิตอื่นๆ ของถนน</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">ความสัมพันธ์กับความปลอดภัย:</span>
                          <span class="formula-equation">ตามทฤษฎีความปลอดภัยทางถนน ความเร็วที่สูงเกินไปเป็นสาเหตุหลักของอุบัติเหตุร้ายแรง โดยความรุนแรงของอุบัติเหตุจะแปรผันตามกำลังสองของความเร็ว (Kinetic Energy = 0.5mv²)</span>
                        </li>
                      </ul>
                    </div>
                  </b-col>

                  <b-col
                    lg="6"
                    md="12"
                    class="mb-3"
                  >
                    <div class="calculation-section">
                      <h4 class="calculation-title">
                        2.7 Average Speed (ความเร็วเฉลี่ย)
                      </h4>
                      <ul class="formula-list">
                        <li>
                          <span class="formula-definition">คำนิยาม:</span>
                          <span class="formula-equation">Vavg = (∑vi) / n</span>
                          <span class="formula-significance">โดยที่:</span>
                          <ul class="formula-variables">
                            <li>∑vi คือผลรวมของความเร็วทั้งหมด</li>
                            <li>n คือจำนวนยานพาหนะที่ตรวจวัด</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">นัยสำคัญทางวิศวกรรม:</span>
                          <span class="formula-equation">ใช้ในการประเมินประสิทธิภาพของการไหลจราจรและการออกแบบสัญญาณไฟจราจร</span>
                        </li>
                      </ul>
                    </div>
                  </b-col>

                  <b-col
                    lg="6"
                    md="12"
                    class="mb-3"
                  >
                    <div class="calculation-section">
                      <h4 class="calculation-title">
                        2.8 85th Percentile Speed (ความเร็วที่เปอร์เซ็นต์ไทล์ที่ 85)
                      </h4>
                      <ul class="formula-list">
                        <li>
                          <span class="formula-definition">คำนิยาม:</span>
                          <span class="formula-equation">V<sub>85</sub> = ค่าความเร็วที่ตำแหน่งเปอร์เซ็นต์ไทล์ที่ 85 ของข้อมูลความเร็วที่เรียงลำดับ</span>
                          <span class="formula-significance">โดยที่:</span>
                          <ul class="formula-variables">
                            <li>ค่าความเร็วที่ตำแหน่งเปอร์เซ็นต์ไทล์ที่ 85 คือความเร็วที่ยานพาหนะร้อยละ 85 ขับขี่ต่ำกว่าหรือเท่ากับค่านี้</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">นัยสำคัญทางวิศวกรรม:</span>
                          <ul class="formula-significance-list">
                            <li>เป็นค่าที่ใช้กำหนดขีดจำกัดความเร็วที่เหมาะสมบนถนน</li>
                            <li>ใช้ในการออกแบบองค์ประกอบทางเรขาคณิตของถนน เช่น รัศมีโค้ง ระยะมองเห็น</li>
                            <li>เป็นตัวชี้วัดพฤติกรรมการขับขี่ที่เป็นธรรมชาติของผู้ขับขี่ส่วนใหญ่</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">การประยุกต์ใช้:</span>
                          <span class="formula-equation">ตามมาตรฐาน AASHTO ค่า V<sub>85</sub> ใช้เป็นเกณฑ์หลักในการกำหนดขีดจำกัดความเร็วและการออกแบบถนน</span>
                        </li>
                      </ul>
                    </div>
                  </b-col>

                  <b-col
                    lg="6"
                    md="12"
                    class="mb-3"
                  >
                    <div class="calculation-section">
                      <h4 class="calculation-title">
                        2.9 Lane Density (ความหนาแน่นของช่องจราจร)
                      </h4>
                      <ul class="formula-list">
                        <li>
                          <span class="formula-definition">คำนิยาม:</span>
                          <span class="formula-equation">D = ∑Vhourly / (N &times; L)</span>
                          <span class="formula-significance">โดยที่:</span>
                          <ul class="formula-variables">
                            <li>∑Vhourly คือผลรวมปริมาณจราจรรายชั่วโมง</li>
                            <li>N คือจำนวนช่องจราจร</li>
                            <li>L คือความยาวของถนนที่ศึกษา (กม.)</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">นัยสำคัญทางวิศวกรรม:</span>
                          <span class="formula-equation">ค่าความหนาแน่นสูงบ่งชี้ถึงระดับความแออัดของการจราจร และมีผลต่อระดับการให้บริการของถนน</span>
                        </li>
                      </ul>
                    </div>
                  </b-col>

                  <b-col
                    lg="6"
                    md="12"
                    class="mb-3"
                  >
                    <div class="calculation-section">
                      <h4 class="calculation-title">
                        2.10 Critical Lane Volume (ปริมาณจราจรในช่องจราจรวิกฤต)
                      </h4>
                      <ul class="formula-list">
                        <li>
                          <span class="formula-definition">คำนิยาม:</span>
                          <span class="formula-equation">CLV = max(V1, V2, ..., Vn)</span>
                          <span class="formula-significance">โดยที่:</span>
                          <ul class="formula-variables">
                            <li>Vi คือปริมาณจราจรในช่องจราจรที่ i</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">นัยสำคัญทางวิศวกรรม:</span>
                          <span class="formula-equation">ใช้ในการประเมินความจุของถนนและการวางแผนการปรับปรุงโครงสร้างพื้นฐาน</span>
                        </li>
                      </ul>
                    </div>
                  </b-col>

                  <b-col
                    lg="6"
                    md="12"
                    class="mb-3"
                  >
                    <div class="calculation-section">
                      <h4 class="calculation-title">
                        2.11 Peak Hour Factor (ปัจจัยชั่วโมงเร่งด่วน)
                      </h4>
                      <ul class="formula-list">
                        <li>
                          <span class="formula-definition">คำนิยาม:</span>
                          <span class="formula-equation">PHF = Vpeak-hour / (4 &times; V15,max)</span>
                          <span class="formula-significance">โดยที่:</span>
                          <ul class="formula-variables">
                            <li>Vpeak-hour คือปริมาณจราจรในชั่วโมงเร่งด่วน</li>
                            <li>V15,max คือปริมาณจราจรสูงสุดใน 15 นาทีของชั่วโมงนั้น</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">ทฤษฎีที่เกี่ยวข้อง:</span>
                          <span class="formula-equation">ค่า PHF ที่เข้าใกล้ 1 แสดงถึงการกระจายตัวของปริมาณจราจรที่สม่ำเสมอในชั่วโมงเร่งด่วน ในขณะที่ค่าต่ำบ่งชี้ถึงความแปรปรวนสูง</span>
                        </li>
                      </ul>
                    </div>
                  </b-col>

                  <b-col
                    lg="6"
                    md="12"
                    class="mb-3"
                  >
                    <div class="calculation-section">
                      <h4 class="calculation-title">
                        2.12 Level of Service (ระดับการให้บริการ)
                      </h4>
                      <ul class="formula-list">
                        <li>
                          <span class="formula-definition">คำนิยาม:</span>
                          <span class="formula-equation">ระดับคุณภาพการให้บริการของถนน วัดจากอัตราส่วนปริมาณจราจรต่อความจุ (V/C Ratio)</span>
                        </li>
                        <li>
                          <span class="formula-definition">นัยสำคัญทางวิศวกรรม:</span>
                          <ul class="formula-significance-list">
                            <li>ใช้ในการประเมินประสิทธิภาพของถนนและวางแผนการปรับปรุง</li>
                            <li>เป็นดัชนีที่ใช้ในการจัดลำดับความสำคัญของโครงการพัฒนาโครงสร้างพื้นฐาน</li>
                            <li>ใช้ในการประเมินผลกระทบด้านการจราจรของโครงการพัฒนาต่างๆ</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </b-col>

                  <b-col
                    lg="6"
                    md="12"
                    class="mb-3"
                  >
                    <div class="calculation-section">
                      <h4 class="calculation-title">
                        Level of Service Classification (การจำแนกระดับการให้บริการ)
                      </h4>
                      <ul class="data-list">
                        <li><strong>ระดับ A</strong> (V/C ≤ 0.60): การจราจรคล่องตัวดีมาก</li>
                        <li><strong>ระดับ B</strong> (V/C 0.61-0.70): การจราจรคล่องตัวดี</li>
                        <li><strong>ระดับ C</strong> (V/C 0.71-0.80): การจราจรคล่องตัวพอใช้</li>
                        <li><strong>ระดับ D</strong> (V/C 0.81-0.90): การจราจรติดขัดเล็กน้อย</li>
                        <li><strong>ระดับ E</strong> (V/C 0.91-1.00): การจราจรติดขัด</li>
                        <li><strong>ระดับ F</strong> (V/C > 1.00): การจราจรติดขัดมาก</li>
                      </ul>
                    </div>
                  </b-col>

                  <b-col
                    lg="6"
                    md="12"
                    class="mb-3"
                  >
                    <div class="calculation-section">
                      <h4 class="calculation-title">
                        2.13 Volume to Capacity Ratio (อัตราส่วนปริมาณจราจรต่อความจุ)
                      </h4>
                      <ul class="formula-list">
                        <li>
                          <span class="formula-definition">คำนิยาม:</span>
                          <span class="formula-equation">V/C = V / C</span>
                          <span class="formula-significance">โดยที่:</span>
                          <ul class="formula-variables">
                            <li>V คือปริมาณจราจร</li>
                            <li>C คือความจุของถนน</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">นัยสำคัญทางวิศวกรรม:</span>
                          <span class="formula-equation">ใช้ในการประเมินประสิทธิภาพการให้บริการของถนนและการวางแผนการปรับปรุง</span>
                        </li>
                      </ul>
                    </div>
                  </b-col>

                  <b-col
                    lg="6"
                    md="12"
                    class="mb-3"
                  >
                    <div class="calculation-section">
                      <h4 class="calculation-title">
                        2.14 Traffic Flow Rate (อัตราการไหลของการจราจร)
                      </h4>
                      <ul class="formula-list">
                        <li>
                          <span class="formula-definition">คำนิยาม:</span>
                          <span class="formula-equation">q = n / T</span>
                          <span class="formula-significance">โดยที่:</span>
                          <ul class="formula-variables">
                            <li>n คือจำนวนยานพาหนะที่ผ่านจุดสำรวจ</li>
                            <li>T คือช่วงเวลาที่ทำการสำรวจ (ชั่วโมง)</li>
                          </ul>
                        </li>
                        <li>
                          <span class="formula-definition">นัยสำคัญทางวิศวกรรม:</span>
                          <span class="formula-equation">เป็นพารามิเตอร์พื้นฐานในการวิเคราะห์การไหลของจราจรและการออกแบบสัญญาณไฟจราจร</span>
                        </li>
                      </ul>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </b-col>

            <b-col lg="12">
              <div class="section-container">
                <h3 class="section-title">
                  3. References (เอกสารอ้างอิง)
                </h3>
                <ul class="reference-list">
                  <li>Highway Capacity Manual (HCM), Transportation Research Board, National Research Council, Washington, D.C., 2010.</li>
                  <li>กรมทางหลวง, คู่มือการวิเคราะห์ความจุของทางหลวง, กระทรวงคมนาคม, 2554.</li>
                  <li>AASHTO, A Policy on Geometric Design of Highways and Streets, American Association of State Highway and Transportation Officials, Washington, D.C., 2018.</li>
                  <li>สำนักอำนวยความปลอดภัย, คู่มือการติดตั้งป้ายจราจร, กรมทางหลวง, 2561.</li>
                </ul>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import {
  BRow,
  BCol,
  BCard,
} from 'bootstrap-vue'
import axios from '@/libs/axios'

export default {
  name: 'ReportP5',
  components: {
    BRow,
    BCol,
    BCard,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      MinDate: '',
      MaxDate: '',
      road_code: '',
      road_name: '',
      amphoe: '',
      province: '',
      distance_km: '',
      sta: '',
      latitude: '',
      longitude: '',
      dept_name: '',
      dept_group: '',
    }
  },
  mounted() {
    this.reportData()
  },
  methods: {
    reportData() {
      axios
        .post('/get-Data-Report-All', { location_id: this.$route.query.location_id })
        .then(response => {
          this.road_code = response.data[0].road_code
          this.road_name = response.data[0].road_name
          this.amphoe = response.data[0].amphoe
          this.province = response.data[0].province
          this.sta = response.data[0].sta
          this.distance_km = response.data[0].distance_km
          this.latitude = response.data[0].latitude
          this.longitude = response.data[0].longitude
          this.dept_name = response.data[0].dept_name
          this.dept_group = response.data[0].dept_group
          this.MinDate = response.data[0].MinDate
          this.MaxDate = response.data[0].MaxDate
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;700&display=swap');

.section-container {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #003366;
  border-bottom: 2px solid #003366;
  padding-bottom: 5px;
}

.calculation-section {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 15px;
  height: 100%;
  margin-bottom: 10px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.calculation-section:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  transform: translateY(-2px);
}

.calculation-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #005792;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 5px;
}

.formula-list {
  list-style-type: none;
  padding-left: 5px;
  margin-bottom: 10px;
}

.formula-list li {
  font-size: 12px;
  margin-bottom: 8px;
  line-height: 1.5;
}

.formula-definition {
  font-weight: bold;
  display: block;
  margin-bottom: 4px;
  color: #333;
}

.formula-equation {
  display: block;
  margin: 6px 0;
  padding: 6px 12px;
  background-color: #f1f8ff;
  border-left: 4px solid #005792;
  font-family: "Courier New", monospace;
  font-weight: bold;
  border-radius: 0 4px 4px 0;
}

.formula-significance {
  display: block;
  font-style: italic;
  margin-top: 4px;
  color: #555;
}

.formula-variables {
  list-style-type: disc;
  padding-left: 20px;
  margin: 5px 0;
}

.formula-variables li {
  font-size: 11px;
  margin-bottom: 3px;
}

.formula-significance-list {
  list-style-type: disc;
  padding-left: 20px;
  margin: 5px 0;
}

.formula-significance-list li {
  font-size: 11px;
  margin-bottom: 3px;
  color: #555;
}

.data-list {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 10px;
}

.data-list li {
  font-size: 12px;
  margin-bottom: 5px;
  line-height: 1.5;
}

.reference-list {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 10px;
}

.reference-list li {
  font-size: 12px;
  margin-bottom: 5px;
  line-height: 1.5;
  font-style: italic;
}

.section-text {
  font-size: 12px;
  margin-bottom: 10px;
  line-height: 1.5;
  color: #333;
}

.text-container {
  margin-bottom: 10px;
}

h2 {
  font-size: 20px !important;
  margin-bottom: 15px !important;
  color: #003366 !important;
}

.mb-3 {
  margin-bottom: 15px !important;
}

.parameter-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
  font-size: 11px;
}

.parameter-table th {
  background-color: #f1f8ff;
  border: 1px solid #dee2e6;
  padding: 6px;
  text-align: center;
  font-weight: bold;
  color: #005792;
}

.parameter-table td {
  border: 1px solid #dee2e6;
  padding: 4px 6px;
  text-align: left;
}

.parameter-table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.data-list.compact-list {
  list-style-type: disc;
  padding-left: 15px;
  margin-bottom: 5px;
}

.data-list.compact-list li {
  font-size: 11px;
  margin-bottom: 2px;
  line-height: 1.3;
}

@media print {
  body {
    font-size: 10px;
    background-color: white !important;
    color: black !important;
    line-height: 1.2;
    font-family: 'Sarabun', sans-serif;
  }

  @page {
    size: A4;
    margin: 1cm;
    orphans: 2;
    widows: 2;
  }

  /* บังคับให้ grid layout ยังคงทำงานเมื่อพิมพ์ */
  .row {
    display: flex !important;
    flex-wrap: wrap !important;
  }

  /* บังคับให้ column ขนาด lg-6 แสดงเป็น 2 คอลัมน์ต่อแถว */
  .col-lg-6 {
    flex: 0 0 50% !important;
    max-width: 50% !important;
  }

  /* บังคับให้ column ขนาด lg-12 แสดงเต็มแถว */
  .col-lg-12 {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }

  /* ป้องกันการเกิดหน้าว่างเปล่า */
  .section-container:last-child {
    page-break-after: avoid !important;
    break-after: avoid !important;
  }

  /* ป้องกันการแบ่งหน้าภายในส่วนสุดท้าย */
  .reference-list {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }

  .section-title {
    font-size: 14px;
    color: #003366 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    margin-bottom: 8px;
    border-bottom: 1px solid #003366 !important;
  }

  .subsection-title {
    font-size: 12px;
    color: #005792 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    margin-bottom: 6px;
  }

  .calculation-title {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 6px;
    color: #005792 !important;
    border-bottom: 1px solid #ddd;
    padding-bottom: 3px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .section-text, .formula-list li, .reference-list li, .data-list li {
    font-size: 10px;
    color: #000000;
    line-height: 1.3;
    margin-bottom: 4px;
  }

  .calculation-section {
    break-inside: avoid;
    page-break-inside: avoid;
    border: 1px solid #dee2e6 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    padding: 8px;
    background-color: #ffffff !important;
  }

  .formula-list, .data-list, .reference-list {
    margin-bottom: 6px;
  }

  .formula-equation {
    background-color: #f1f8ff !important;
    border-left: 3px solid #005792 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    padding: 3px 8px;
    margin: 4px 0;
    font-size: 10px;
  }

  .parameter-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 8px;
    font-size: 9px;
  }

  .parameter-table th {
    background-color: #f1f8ff !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    border: 1px solid #dee2e6;
    padding: 4px;
    color: #005792 !important;
  }

  .parameter-table td {
    border: 1px solid #dee2e6;
    padding: 3px 4px;
  }

  .parameter-table tr:nth-child(even) {
    background-color: #f8f9fa !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
