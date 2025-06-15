<template>
  <div>
    <NBIoTStatus />
    <b-row>
      <!-- Map🚀 -->

      <b-col cols="12">
        <template>
          <b-card-code style="background-color:rgba(255,255,255, 0.9);">
            <b-row>
              <b-col
                md="7"
                sm="12"
                lg="7"
                xs="12"
                class="d-flex align-items-center mb-1 flex-wrap"
              >
                <b-link
                  v-if="device"
                  style="font-size: 18px; color: #808080; margin-right: 15px;"
                  to="/Device"
                >
                  <feather-icon
                    style="margin-bottom: 5px;"
                    size="16"
                    icon="ArrowLeftIcon"
                  /><span style="color: #ed7a00;"> {{ detail }} </span>
                </b-link>
                <b-link
                  v-if="!device"
                  style="font-size: 18px; color: #808080; margin-right: 15px;"
                  :to="`/NB-IoT_Detail-4G-All?imei=${imei}`"
                >
                  <feather-icon
                    style="margin-bottom: 5px;"
                    size="16"
                    icon="ArrowLeftIcon"
                  /><span style="color: #ed7a00;"> {{ detail }} </span>
                  <span
                    v-if="dev_type !== null"
                    style="color: #ed7a00;"
                  > / {{ dev_type }}</span>
                </b-link>
                <b-button
                  size="sm"
                  variant="success"
                  class="btn-tour-skip mr-1"
                  @click="getTableNBIoTLog(),filter = ''"
                >
                  All
                </b-button>
                <b-button
                  size="sm"
                  variant="warning"
                  class="btn-tour-skip mr-1"
                  @click="getTableNBIoTLog(),filter = 'circuit'"
                >
                  Circuit
                </b-button>
                <b-button
                  size="sm"
                  variant="danger"
                  class="btn-tour-skip mr-1"
                  @click="getTableNBIoTLog(),filter = 'line-check'"
                >
                  Line_Check
                </b-button>
                <b-button
                  size="sm"
                  variant="info"
                  class="btn-tour-skip mr-1"
                  @click="getTableNBIoTLog(),filter = 'volt-amp'"
                >
                  Volt_Amp
                </b-button>
                <b-button
                  size="sm"
                  variant="primary"
                  class="btn-tour-skip mr-1"
                  @click="getTableNBIoTLog(),filter = 'other'"
                >
                  Other
                </b-button>

                <b-button
                  v-if="phase_type === '1p'"
                  size="sm"
                  variant="warning"
                  class="btn-tour-skip mr-1 diagram-button"
                  style="background-color: #ff8c00; border-color: #ff8c00;"
                  @click.prevent="openDiagramModal(`https://drr.enixma.net/semcontrol-detail1?wid=${wid}&type=${type}&imei=${$route.query.imei}`, 'Diagram')"
                >
                  Diagram
                </b-button>

                <b-button
                  v-if="phase_type === '3p'"
                  size="sm"
                  variant="warning"
                  class="btn-tour-skip mr-1 diagram-button"
                  style="background-color: #ff8c00; border-color: #ff8c00;"
                  @click.prevent="openDiagramModal(`https://drr.enixma.net/SEMNB-iotCab3P?wid=${wid}&type=${type}&imei=${$route.query.imei}`, 'Diagram')"
                >
                  Diagram
                </b-button>

                <b-button
                  v-if="phase_type === '1p_lora'"
                  size="sm"
                  variant="warning"
                  class="btn-tour-skip mr-1 diagram-button"
                  style="background-color: #ff8c00; border-color: #ff8c00;"
                  @click.prevent="openDiagramModal(`https://drr.enixma.net/nbiot-lora?wid=${wid}&type=${type}&imei=${$route.query.imei}`, 'Diagram')"
                >
                  Diagram
                </b-button>
              </b-col>
              <b-col
                md="5"
                sm="12"
                lg="5"
                xs="12"
                class="d-flex align-items-center justify-content-end mb-1"
              >
                <!-- Date Picker -->
                <div
                  class="datepicker-container"
                  style="min-width: 150px; flex-shrink: 0; margin-right: 10px;"
                >
                  <b-form-datepicker
                    v-model="selectedDate"
                    size="sm"
                    class="datepicker-fixed"
                    :date-format-options="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
                    locale="th"
                    style="width: 100%;"
                    @input="searchByDate"
                  />
                </div>

                <!-- <span class="mr-1">{{ check }}</span> -->
                <b-img
                  v-if="speaker == 1"
                  src="@/assets/images/icons/alert_b2.gif"
                  style="height: 20px; width: 40px;"
                  class="mr-1"
                />
                <b-button
                  size="sm"
                  variant="primary"
                  class="btn-icon rounded-circle mr-1"
                  @click="getTableNBIoTLog()"
                >
                  <span><feather-icon
                    size="16"
                    icon="RefreshCwIcon"
                  />
                  </span>
                </b-button>

                <b-input-group
                  size="sm"
                  style="width: auto; min-width: 200px;"
                >
                  <b-form-input
                    id="filterInput"
                    v-model="filter"
                    type="search"
                    placeholder="ป้อนคำที่ต้องการค้นหา.."
                    label-cols-sm="12"
                    label-cols-md="2"
                    label-cols-lg="2"
                    style="background-color:rgba(255,255,255, 0.9);"
                  />
                  <b-input-group-append>
                    <b-button
                      :disabled="!filter"
                      @click="filter = ''"
                    >
                      ล้าง
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col cols="12">
                <b-table
                  responsive
                  :items="items1"
                  :fields="fields1"
                >
                  <template #cell(version)="data">
                    <span style="color: black;">
                      {{ data.item.version }}
                    </span>
                  </template>
                  <template #cell(lastseen)="data">
                    <span style="color: black;">
                      {{ data.item.lastseen }}
                    </span>
                  </template>
                  <template #cell(imei)="data">
                    <span style="color: black;">
                      {{ data.item.imei }}
                    </span>
                  </template>
                  <template #cell(ISOnline)="data">
                    <b-badge :variant="ISOnline[1][data.value]">
                      {{ ISOnline[0][data.value] }}
                    </b-badge>
                  </template>
                  <template #cell(c_other)="data">
                    <b-badge
                      v-if="data.item.c_safety_swtich === '0' && diagram_type.STW >= '1'"
                      variant="danger"
                    >
                      ST
                    </b-badge>
                    <span v-if="data.item.c_safety_swtich === '0' && diagram_type.STW >= '1'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_safety_swtich === '0' && diagram_type.STW === '0'"
                      :style="{backgroundColor: 'rgba(160, 160, 160, 0.5)'}"
                    >
                      ST
                    </b-badge>
                    <span v-if="data.item.c_safety_swtich === '0' && diagram_type.STW === '0'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_safety_swtich === '1' && diagram_type.STW >= '1'"
                      variant="success"
                    >
                      ST
                    </b-badge>
                    <span v-if="data.item.c_safety_swtich === '1' && diagram_type.STW >= '1'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_main_breaker === '0' && diagram_type.MCB >= 1"
                      variant="danger"
                    >
                      MB
                    </b-badge>
                    <span v-if="data.item.c_main_breaker === '0' && diagram_type.MCB >= 1">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_main_breaker === '0' && diagram_type.MCB === 0"
                      :style="{backgroundColor: 'rgba(160, 160, 160, 0.5)'}"
                    >
                      MB
                    </b-badge>
                    <span v-if="data.item.c_main_breaker === '0' && diagram_type.MCB === 0">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_main_breaker === '1' && diagram_type.MCB >= 1"
                      variant="success"
                    >
                      MB
                    </b-badge>
                    <span v-if="data.item.c_main_breaker === '1' && diagram_type.MCB >= 1">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_photo_switch === '0' && diagram_type.PW >= 1"
                      variant="danger"
                    >
                      PS
                    </b-badge>
                    <span v-if="data.item.c_photo_switch === '0' && diagram_type.PW >= 1">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_photo_switch === '0' && diagram_type.PW === 0"
                      :style="{backgroundColor: 'rgba(160, 160, 160, 0.5)'}"
                    >
                      PS
                    </b-badge>
                    <span v-if="data.item.c_photo_switch === '0' && diagram_type.PW === 0">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_photo_switch === '1' && diagram_type.PW >= 1"
                      variant="success"
                    >
                      PS
                    </b-badge>
                    <span v-if="data.item.c_photo_switch === '1' && diagram_type.PW >= 1">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_magnetic_contactor1 === '0' && diagram_type.MC >= 1"
                      variant="danger"
                    >
                      MC1
                    </b-badge>
                    <span v-if="data.item.c_magnetic_contactor1 === '0' && diagram_type.MC >= 1">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_magnetic_contactor1 === '0' && diagram_type.MC === 0"
                      :style="{backgroundColor: 'rgba(160, 160, 160, 0.5)'}"
                    >
                      MC1
                    </b-badge>
                    <span v-if="data.item.c_magnetic_contactor1 === '0' && diagram_type.MC === 0">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_magnetic_contactor1 === '1' && diagram_type.MC >= 1"
                      variant="success"
                    >
                      MC1
                    </b-badge>
                    <span v-if="data.item.c_magnetic_contactor1 === '1' && diagram_type.MC >= 1">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_magnetic_contactor2 === '0' && diagram_type.MC >= 2"
                      variant="danger"
                    >
                      MC2
                    </b-badge>
                    <span v-if="data.item.c_magnetic_contactor2 === '0' && diagram_type.MC >= 2">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_magnetic_contactor2 === '0' && diagram_type.MC <= 1"
                      :style="{backgroundColor: 'rgba(160, 160, 160, 0.5)'}"
                    >
                      MC2
                    </b-badge>
                    <span v-if="data.item.c_magnetic_contactor2 === '0' && diagram_type.MC <= 1">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_magnetic_contactor2 === '1' && diagram_type.MC >= 2"
                      variant="success"
                    >
                      MC2
                    </b-badge>
                    <span v-if="data.item.c_magnetic_contactor2 === '1' && diagram_type.MC >= 2">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_sub_breaker1 === '0' && diagram_type.CB >= 1"
                      variant="danger"
                    >
                      CB1
                    </b-badge>
                    <span v-if="data.item.c_sub_breaker1 === '0' && diagram_type.CB >= 1">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_sub_breaker1 === '0' && diagram_type.CB === 0"
                      :style="{backgroundColor: 'rgba(160, 160, 160, 0.5)'}"
                    >
                      CB1
                    </b-badge>
                    <span v-if="data.item.c_sub_breaker1 === '0' && diagram_type.CB === 0">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_sub_breaker1 === '1' && diagram_type.CB >= 1"
                      variant="success"
                    >
                      CB1
                    </b-badge>
                    <span v-if="data.item.c_sub_breaker1 === '1' && diagram_type.CB >= 1">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_sub_breaker2 === '0' && diagram_type.CB >= 2"
                      variant="danger"
                    >
                      CB2
                    </b-badge>
                    <span v-if="data.item.c_sub_breaker2 === '0' && diagram_type.CB >= 2">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_sub_breaker2 === '0' && diagram_type.CB <= 1"
                      :style="{backgroundColor: 'rgba(160, 160, 160, 0.5)'}"
                    >
                      CB2
                    </b-badge>
                    <span v-if="data.item.c_sub_breaker2 === '0' && diagram_type.CB <= 1">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_sub_breaker2 === '1' && diagram_type.CB >= 2"
                      variant="success"
                    >
                      CB2
                    </b-badge>
                    <span v-if="data.item.c_sub_breaker2 === '1' && diagram_type.CB >= 2">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_sub_breaker3 === '0' && diagram_type.CB >= 3"
                      variant="danger"
                    >
                      CB3
                    </b-badge>
                    <span v-if="data.item.c_sub_breaker3 === '0' && diagram_type.CB >= 3">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_sub_breaker3 === '0' && diagram_type.CB <= 2"
                      :style="{backgroundColor: 'rgba(160, 160, 160, 0.5)'}"
                    >
                      CB3
                    </b-badge>
                    <span v-if="data.item.c_sub_breaker3 === '0' && diagram_type.CB <= 2">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_sub_breaker3 === '1' && diagram_type.CB >= 3"
                      variant="success"
                    >
                      CB3
                    </b-badge>
                    <span v-if="data.item.c_sub_breaker3 === '1' && diagram_type.CB >= 3">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_sub_breaker4 === '0' && diagram_type.CB >= 4"
                      variant="danger"
                    >
                      CB4
                    </b-badge>
                    <span v-if="data.item.c_sub_breaker4 === '0' && diagram_type.CB >= 4">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_sub_breaker4 === '0' && diagram_type.CB <= 3"
                      :style="{backgroundColor: 'rgba(160, 160, 160, 0.5)'}"
                    >
                      CB4
                    </b-badge>
                    <span v-if="data.item.c_sub_breaker4 === '0' && diagram_type.CB <= 3">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_sub_breaker4 === '1' && diagram_type.CB >= 4"
                      variant="success"
                    >
                      CB4
                    </b-badge>
                    <span v-if="data.item.c_sub_breaker4 === '1' && diagram_type.CB >= 4">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_other === '0' && diagram_type.TFM >= 1"
                      variant="danger"
                    >
                      TFM
                    </b-badge>
                    <span v-if="data.item.c_other === '0' && diagram_type.TFM >= 1">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_other === '0' && diagram_type.TFM === 0"
                      :style="{backgroundColor: 'rgba(160, 160, 160, 0.5)'}"
                    >
                      TFM
                    </b-badge>
                    <span v-if="data.item.c_other === '0' && diagram_type.TFM === 0">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.c_other === '1' && diagram_type.TFM >= 1"
                      variant="success"
                    >
                      TFM
                    </b-badge>
                    <span v-if="data.item.c_other === '1' && diagram_type.TFM >= 1">
                        &nbsp;
                    </span>
                  </template>
                  <template #cell(line_detect1)="data">
                    <a v-if="data.item.firmware === 'nbiot_cab_line_check_1w_l' || data.item.firmware === 'nbiot_cab_line_check_2w'">
                      <b-badge
                        v-if="data.item.line_detect_fail_left == 1"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(255, 0, 0, 0.5)'}"
                      >
                        <b-badge
                          class="mr-1"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                        <b-badge
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                      </b-badge>
                      <b-badge
                        v-if="data.item.line_detect_fail_left == 0"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(60, 179, 113, 0.5)'}"
                      >
                        <b-badge
                          class="mr-1"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          variant="success"
                        >
                          OK
                        </b-badge>
                      </b-badge>
                    </a>
                    <a v-if="data.item.firmware === 'nbiot_cab_line_check_1w_r' || data.item.firmware === 'nbiot_cab_line_check_2w'">
                      <b-badge
                        v-if="data.item.line_detect_fail_right == 1"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(255, 0, 0, 0.5)'}"
                      >
                        <b-badge
                          class="mr-1"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                        <b-badge
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                      </b-badge>
                      <b-badge
                        v-if="data.item.line_detect_fail_right == 0"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(60, 179, 113, 0.5)'}"
                      >
                        <b-badge
                          class="mr-1"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          variant="success"
                        >
                          OK
                        </b-badge>
                      </b-badge>
                    </a>

                  </template>
                </b-table>
              </b-col>
              <b-col cols="12">
                <b-table
                  responsive
                  :per-page="perPage"
                  :current-page="currentPage"
                  :items="items"
                  :fields="fields"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :sort-direction="sortDirection"
                  :filter="filter"
                  :filter-function="customFilter"
                  :filter-included-fields="filterOn"
                  @filtered="onFiltered"
                >
                  <template #cell(line_detect1)="data">
                    <span
                      v-if="data.item.e == 'Slave ID Online' && data.item.line_count_left != 0 && ['line-check-2w', 'line-check-1w-l',].includes(data.item.data_type)"
                      class="mr-1"
                    > ( {{ data.item.line_count_left }} )</span>
                    <span
                      v-if="data.item.e == 'Slave ID Online' && ['line-check-2w', 'line-check-1w-l',].includes(data.item.data_type)"
                      class="mr-1"
                    >ซ้าย</span>

                    <div v-if="equipment === 'iot4g-67'">
                      <b-badge
                        v-if="data.item.c > 1 && (data.item.line_detect1 == 'fail' || data.item.line_detect2 == 'fail')"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(255, 0, 0, 0.5)'}"
                      >
                        <b-badge
                          v-if="data.item.line_detect1 != null & data.item.line_detect1 == 'ok'"
                          class="mr-1"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect1 != null & data.item.line_detect1 == 'fail'"
                          class="mr-1"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect2 != null & data.item.line_detect2 == 'ok'"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect2 != null & data.item.line_detect2 == 'fail'"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                      </b-badge>
                      <b-badge
                        v-if="data.item.c > 1 && (data.item.line_detect1 == 'ok' && data.item.line_detect2 == 'ok')"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(60, 179, 113, 0.5)'}"
                      >
                        <b-badge
                          v-if="data.item.line_detect1 != null & data.item.line_detect1 == 'ok'"
                          class="mr-1"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect2 != null & data.item.line_detect2 == 'ok'"
                          variant="success"
                        >
                          OK
                        </b-badge>
                      </b-badge>

                      <b-badge
                        v-if="data.item.c > 2 && (data.item.line_detect3 == 'fail' || data.item.line_detect4 == 'fail')"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(255, 0, 0, 0.5)'}"
                      >
                        <b-badge
                          v-if="data.item.line_detect3 != null & data.item.line_detect3 == 'ok'"
                          class="mr-1"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect3 != null & data.item.line_detect3 == 'fail'"
                          class="mr-1"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect4 != null & data.item.line_detect4 == 'ok'"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect4 != null & data.item.line_detect4 == 'fail'"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                      </b-badge>
                      <b-badge
                        v-if="data.item.c > 2 && (data.item.line_detect3 == 'ok' && data.item.line_detect4 == 'ok')"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(60, 179, 113, 0.5)'}"
                      >
                        <b-badge
                          v-if="data.item.line_detect3 != null & data.item.line_detect3 == 'ok'"
                          class="mr-1"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect4 != null & data.item.line_detect4 == 'ok'"
                          variant="success"
                        >
                          OK
                        </b-badge>
                      </b-badge>

                      <b-badge
                        v-if="data.item.c > 4 && (data.item.line_detect5 == 'fail' || data.item.line_detect6 == 'fail')"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(255, 0, 0, 0.5)'}"
                      >
                        <b-badge
                          v-if="data.item.line_detect5 != null & data.item.line_detect5 == 'ok'"
                          class="mr-1"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect5 != null & data.item.line_detect5 == 'fail'"
                          class="mr-1"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect6 != null & data.item.line_detect6 == 'ok'"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect6 != null & data.item.line_detect6 == 'fail'"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                      </b-badge>
                      <b-badge
                        v-if="data.item.c > 4 && (data.item.line_detect5 == 'ok' && data.item.line_detect6 == 'ok')"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(60, 179, 113, 0.5)'}"
                      >
                        <b-badge
                          v-if="data.item.line_detect5 != null & data.item.line_detect5 == 'ok'"
                          class="mr-1"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect6 != null & data.item.line_detect6 == 'ok'"
                          variant="success"
                        >
                          OK
                        </b-badge>
                      </b-badge>

                      <b-badge
                        v-if="data.item.c > 6 && (data.item.line_detect7 == 'fail' || data.item.line_detect8 == 'fail')"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(255, 0, 0, 0.5)'}"
                      >
                        <b-badge
                          v-if="data.item.line_detect7 != null & data.item.line_detect7 == 'ok'"
                          class="mr-1"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect7 != null & data.item.line_detect7 == 'fail'"
                          class="mr-1"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect8 != null & data.item.line_detect8 == 'ok'"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect8 != null & data.item.line_detect8 == 'fail'"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                      </b-badge>
                      <b-badge
                        v-if="data.item.c > 6 && (data.item.line_detect7 == 'ok' && data.item.line_detect8 == 'ok')"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(60, 179, 113, 0.5)'}"
                      >
                        <b-badge
                          v-if="data.item.line_detect7 != null & data.item.line_detect7 == 'ok'"
                          class="mr-1"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect8 != null & data.item.line_detect8 == 'ok'"
                          variant="success"
                        >
                          OK
                        </b-badge>
                      </b-badge>
                    </div>
                    <div v-if="equipment !== 'iot4g-67'">
                      <b-badge
                        v-if="data.item.line_detect1 == 'fail' & data.item.line_detect2 == 'fail'"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(255, 0, 0, 0.5)'}"
                      >
                        <b-badge
                          v-if="data.item.line_detect1 != null & data.item.line_detect1 == 'fail'"
                          class="mr-1"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect2 != null & data.item.line_detect2 == 'fail'"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                      </b-badge>
                      <b-badge
                        v-if="data.item.line_detect1 == 'ok' || data.item.line_detect2 == 'ok'"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(60, 179, 113, 0.5)'}"
                      >
                        <b-badge
                          v-if="data.item.line_detect1 != null & data.item.line_detect1 == 'ok'"
                          class="mr-1"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect1 != null & data.item.line_detect1 == 'fail'"
                          class="mr-1"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect2 != null & data.item.line_detect2 == 'ok'"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect2 != null & data.item.line_detect2 == 'fail'"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                      </b-badge>

                      <b-badge
                        v-if="data.item.line_detect3 == 'fail' & data.item.line_detect4 == 'fail'"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(255, 0, 0, 0.5)'}"
                      >
                        <b-badge
                          v-if="data.item.line_detect3 != null & data.item.line_detect3 == 'fail'"
                          class="mr-1"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect4 != null & data.item.line_detect4 == 'fail'"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                      </b-badge>
                      <b-badge
                        v-if="data.item.line_detect3 == 'ok' || data.item.line_detect4 == 'ok'"
                        class="mr-1"
                        :style="{backgroundColor: 'rgba(60, 179, 113, 0.5)'}"
                      >
                        <b-badge
                          v-if="data.item.line_detect3 != null & data.item.line_detect3 == 'ok'"
                          class="mr-1"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect3 != null & data.item.line_detect3 == 'fail'"
                          class="mr-1"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect4 != null & data.item.line_detect4 == 'ok'"
                          variant="success"
                        >
                          OK
                        </b-badge>
                        <b-badge
                          v-if="data.item.line_detect4 != null & data.item.line_detect4 == 'fail'"
                          variant="danger"
                        >
                          FAIL
                        </b-badge>
                      </b-badge>
                    </div>

                    <span
                      v-if="data.item.e == 'Slave ID Online' && ['line-check-2w', 'line-check-1w-r',].includes(data.item.data_type)"
                    >ขวา</span>
                    <span
                      v-if="data.item.e == 'Slave ID Online' && data.item.line_count_right != 0 && ['line-check-2w', 'line-check-1w-r',].includes(data.item.data_type)"
                      class="mr-1"
                    > ( {{ data.item.line_count_right }} )</span>

                    <div v-if="data.item.data_type == 'circuit'">
                      <b-badge
                        v-if="data.item.f.substring(0,1) === '0' && diagram_type.STW >= 1"
                        variant="danger"
                      >
                        ST
                      </b-badge>
                      <span v-if="data.item.f.substring(0,1) === '0' && diagram_type.STW >= 1">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.f.substring(0,1) === '1' && diagram_type.STW >= 1"
                        variant="success"
                      >
                        ST
                      </b-badge>
                      <span v-if="data.item.f.substring(0,1) === '1' && diagram_type.STW >= 1">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.f.substring(1,2) === '0' && diagram_type.MCB >= 1"
                        variant="danger"
                      >
                        MB
                      </b-badge>
                      <span v-if="data.item.f.substring(1,2) === '0' && diagram_type.MCB >= 1">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.f.substring(1,2) === '1' && diagram_type.MCB >= 1"
                        variant="success"
                      >
                        MB
                      </b-badge>
                      <span v-if="data.item.f.substring(1,2) === '1' && diagram_type.MCB >= 1">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.f.substring(2,3) === '0' && diagram_type.PW >= 1"
                        variant="danger"
                      >
                        PS
                      </b-badge>
                      <span v-if="data.item.f.substring(2,3) === '0' && diagram_type.PW >= 1">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.f.substring(2,3) === '1' && diagram_type.PW >= 1"
                        variant="success"
                      >
                        PS
                      </b-badge>
                      <span v-if="data.item.f.substring(2,3) === '1' && diagram_type.PW >= 1">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.f.substring(3,4) === '0' && diagram_type.MC >= 1"
                        variant="danger"
                      >
                        MC1
                      </b-badge>
                      <span v-if="data.item.f.substring(3,4) === '0' && diagram_type.MC >= 1">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.f.substring(3,4) === '1' && diagram_type.MC >= 1"
                        variant="success"
                      >
                        MC1
                      </b-badge>
                      <span v-if="data.item.f.substring(3,4) === '1' && diagram_type.MC >= 1">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.f.substring(4,5) === '0' && diagram_type.MC >= 2"
                        variant="danger"
                      >
                        MC2
                      </b-badge>
                      <span v-if="data.item.f.substring(4,5) === '0' && diagram_type.MC >= 2">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.f.substring(4,5) === '1' && diagram_type.MC >= 2"
                        variant="success"
                      >
                        MC2
                      </b-badge>
                      <span v-if="data.item.f.substring(4,5) === '1' && diagram_type.MC >= 2">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.g.substring(0,1) === '0' && diagram_type.CB >= 1"
                        variant="danger"
                      >
                        CB1
                      </b-badge>
                      <span v-if="data.item.g.substring(0,1) === '0' && diagram_type.CB >= 1">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.g.substring(0,1) === '1' && diagram_type.CB >= 1"
                        variant="success"
                      >
                        CB1
                      </b-badge>
                      <span v-if="data.item.g.substring(0,1) === '1' && diagram_type.CB >= 1">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.g.substring(1,2) === '0' && diagram_type.CB >= 2"
                        variant="danger"
                      >
                        CB2
                      </b-badge>
                      <span v-if="data.item.g.substring(1,2) === '0' && diagram_type.CB >= 2">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.g.substring(1,2) === '1' && diagram_type.CB >= 2"
                        variant="success"
                      >
                        CB2
                      </b-badge>
                      <span v-if="data.item.g.substring(1,2) === '1' && diagram_type.CB >= 2">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.g.substring(2,3) === '0' && diagram_type.CB >= 3"
                        variant="danger"
                      >
                        CB3
                      </b-badge>
                      <span v-if="data.item.g.substring(2,3) === '0' && diagram_type.CB >= 3">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.g.substring(2,3) === '1' && diagram_type.CB >= 3"
                        variant="success"
                      >
                        CB3
                      </b-badge>
                      <span v-if="data.item.g.substring(2,3) === '1' && diagram_type.CB >= 3">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.g.substring(3,4) === '0' && diagram_type.CB >= 4"
                        variant="danger"
                      >
                        CB4
                      </b-badge>
                      <span v-if="data.item.g.substring(3,4) === '0' && diagram_type.CB >= 4">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.g.substring(3,4) === '1' && diagram_type.CB >= 4"
                        variant="success"
                      >
                        CB4
                      </b-badge>
                      <span v-if="data.item.g.substring(3,4) === '1' && diagram_type.CB >= 4">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.g.substring(4,5) === '0' && diagram_type.TFM >= 1"
                        variant="danger"
                      >
                        TFM
                      </b-badge>
                      <span v-if="data.item.g.substring(4,5) === '0' && diagram_type.TFM >= 1">
                        &nbsp;
                      </span>
                      <b-badge
                        v-if="data.item.g.substring(4,5) === '1' && diagram_type.TFM >= 1"
                        variant="success"
                      >
                        TFM
                      </b-badge>
                      <span v-if="data.item.g.substring(4,5) === '1' && diagram_type.TFM >= 1">
                        &nbsp;
                      </span>
                    </div>
                  </template>
                  <template #cell(a)="data">
                    IMEI : {{ data.item.a }}
                  </template>
                  <template #cell(b)="data">
                    <b-badge
                      :variant="box_type[1][data.value]"
                    >
                      {{ box_type[0][data.value] }}
                    </b-badge>
                  </template>
                  <template #cell(f)="data">
                    <span
                      v-if="data.item.data_type === 'volt-amp'"
                    >
                      {{ data.item.f }} V - {{ data.item.g }} A
                    </span>
                    <span
                      v-if="data.item.data_type != 'volt-amp'"
                    >
                      {{ data.item.f }} - {{ data.item.g }}
                    </span>
                  </template>
                  <template #cell(data_type)="data">
                    <span>
                      {{ data.item.data_type }}
                      <b-img
                        v-if="data.item.slave_flag_alarm_b1_Relay_Alarm != null & data.item.slave_flag_alarm_b1_Relay_Alarm == 1"
                        src="@/assets/images/icons/alert_b1.gif"
                        style="height: 20px; width: 20px;"
                      />
                    </span>
                  </template>
                  <template #cell(phase)="data">
                    <span v-if="data.item.phase !== null">
                      {{ data.item.phase }}
                    </span>
                    <span v-if="data.item.phase == null">
                      1
                    </span>
                  </template>
                </b-table>
              </b-col>
              <b-col
                cols="12"
              >
                <b-card-body class="d-flex justify-content-between flex-wrap pt-1">

                  <!-- page length -->
                  <b-form-group
                    label="Per Page"
                    label-cols="6"
                    label-align="left"
                    label-size="sm"
                    label-for="sortBySelect"
                    class="text-nowrap mb-md-0 mr-1"
                  >
                    <b-form-select
                      id="perPageSelect"
                      v-model="perPage"
                      size="sm"
                      inline
                      :options="pageOptions"
                      style="background-color:rgba(255,255,255, 0.9);"
                    />
                  </b-form-group>

                  <!-- pagination -->
                  <div>
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      first-number
                      last-number
                      prev-class="prev-item"
                      next-class="next-item"
                      class="mb-0"
                    >
                      <template #prev-text>
                        <feather-icon
                          icon="ChevronLeftIcon"
                          size="18"
                        />
                      </template>
                      <template #next-text>
                        <feather-icon
                          icon="ChevronRightIcon"
                          size="18"
                        />
                      </template>
                    </b-pagination>
                  </div>
                </b-card-body>
              </b-col>
            </b-row>
            <NBIot-Type
              ref="comment"
              @fetch="getTableNBIoTDetail()"
            />
            <!-- Diagram Modal -->
            <b-modal
              id="diagram-modal"
              v-model="showDiagramModal"
              size="xl"
              hide-footer
              hide-header
              no-close-on-backdrop
              modal-class="diagram-fullscreen-modal"
              body-class="p-0"
              content-class="bg-dark"
              scrollable
              fullscreen
            >
              <div
                class="position-relative diagram-container"
                style="height: 90vh;"
              >
                <iframe
                  :src="diagramUrl"
                  class="w-100 h-100"
                  frameborder="0"
                />
                <div
                  class="position-absolute"
                  style="top: 10px; right: 10px;"
                >
                  <b-button
                    variant="outline-secondary"
                    @click="showDiagramModal = false"
                  >
                    <feather-icon
                      icon="XIcon"
                      size="18"
                    />
                  </b-button>
                </div>
              </div>
            </b-modal>
          </b-card-code>
        </template>
      </b-col>
    </b-row>
    <!-- Comment Modal -->
    <NBIotComment
      ref="commentModal"
      @fetch="getTableNBIoTLogStatuus"
    />
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  BRow, BCol, BTable, BFormGroup, BBadge, BImg,
  BFormSelect, BPagination, BCardBody, BLink,
  BButton, BInputGroupAppend, BInputGroup, BFormInput, BFormDatepicker,
} from 'bootstrap-vue'
import axios from '@axios'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'

export default {
  components: {
    BRow,
    BCol,
    BTable,
    BFormGroup,
    BFormSelect,
    BPagination,
    BCardBody,
    BButton,
    BInputGroupAppend,
    BInputGroup,
    BFormInput,
    BCardCode,
    BBadge,
    BLink,
    BImg,
    BFormDatepicker,
  },
  data() {
    return {
      // Modal properties
      showDiagramModal: false,
      diagramUrl: '',
      modalTitle: '',
      equipment: '',
      device: null,
      imei: '',

      // Date picker properties
      selectedDate: new Date().toISOString().slice(0, 10),
      dateFormatted: '',
      isLoading: false,
      errorMessage: '',
      diagram_type: [{
        STW: '',
        MCB: '',
        PW: '',
        MC: '',
        CB: '',
        TFM: '',
      }],
      bool: '',
      c_other: '',
      line1: '',
      line2: '',
      line3: '',
      line4: '',
      items1: [],
      fields1: [
        {
          key: 'lastseen', label: 'อัพเดตล่าสุด', sortable: false, class: 'text-center box', tdClass: 'bg-light-warning', thStyle: { background: 'rgb(255, 177, 0,0.7)', color: '#000' },
        },
        {
          key: 'imei', label: 'imei', sortable: false, class: 'text-center box', tdClass: 'bg-light-warning', thStyle: { background: 'rgb(255, 177, 0,0.7)', color: '#000' },
        },
        {
          key: 'ISOnline', label: 'สถานะ', sortable: false, class: 'text-center box', tdClass: 'bg-light-warning', thStyle: { background: 'rgb(255, 177, 0,0.7)', color: '#000' },
        },
        {
          key: 'c_other', label: 'Diagram', sortable: false, class: 'text-center box', tdClass: 'bg-light-warning', thStyle: { background: 'rgb(255, 177, 0,0.7)', color: '#000' },
        },
        {
          key: 'line_detect1', label: 'Line detect', sortable: false, class: 'text-center box', tdClass: 'bg-light-warning', thStyle: { background: 'rgb(255, 177, 0,0.7)', color: '#000' },
        },
        {
          key: 'version', label: 'Version', sortable: false, class: 'text-center box', tdClass: 'bg-light-warning', thStyle: { background: 'rgb(255, 177, 0,0.7)', color: '#000' },
        },
      ],
      items: [],
      fields: [
        {
          key: 'date_time', label: 'วัน/เวลา', sortable: true, class: 'text-center box',
        },
        {
          key: 'e', label: 'BOX Type', sortable: true, class: 'text-center box',
        },
        {
          key: 'f', label: 'Data 1-2', sortable: true, class: 'text-center box',
        },
        {
          key: 'line_detect1', label: 'Data Info', sortable: true, class: 'text-center box',
        },
        {
          key: 'data_type', label: 'Type', sortable: true, class: 'text-center box',
        },
        {
          key: 'phase', label: 'Phase', sortable: true, class: 'text-center box',
        },
      ],
      detail: '',
      deptid: '',
      dev_type: '',
      type: '',
      wid: '',
      phase_type: '',
      // --------history--------
      perPage: 250,
      pageOptions: [25, 50, 75, 100, 250],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      box_type: [{
        88: 'ตัวแม่', 20: 'ตัวลูก', 10: 'ตัวแม่',
      },
      {
        88: 'light-primary', 20: 'light-dark', 10: 'light-primary',
      }],
      line_detect1: [{
        fail: 'FAIL', ok: 'OK',
      },
      {
        fail: 'danger', ok: 'success',
      }],
      line_detect2: [{
        fail: 'FAIL', ok: 'OK',
      },
      {
        fail: 'danger', ok: 'success',
      }],
      ISOnline: [{
        Offline: 'Offline', Online: 'Online',
      },
      {
        Offline: 'danger', Online: 'success',
      }],
      userData: JSON.parse(localStorage.getItem('userData')),
      switch: {
        imei: '',
        controller_id: 1,
        drv1_cmd: '',
      },
      speaker: '',
      speakerL: '',
      check: '',
      drv1_cmd: '',
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  mounted() {
    // กำหนดค่า imei จาก route.query เมื่อ component ถูกโหลด
    if (this.$route.query.imei) {
      this.imei = this.$route.query.imei
    }

    // กำหนดค่าวันที่ปัจจุบันสำหรับการกรองข้อมูล
    this.dateFormatted = this.formatDateForAPI(new Date())
    console.log('Initial date set to:', this.dateFormatted)

    // กำหนดค่า device จาก route.query
    this.device = this.$route.query.type

    // เรียกใช้เมธอดที่จำเป็นเมื่อ component ถูกโหลด
    this.checkNBIoTLog()
    this.checkDiagram()
    this.getTableNBIoTLog()
    this.checkSwith()
    this.getTableNBIoTLogStatuus()

    // ตั้งค่า interval สำหรับการอัปเดตข้อมูลอัตโนมัติ
    this.interval1 = setInterval(() => {
      this.checkNBIoTLog()
      this.checkSwith()
      this.getTableNBIoTLogStatuus()
    }, 20000)
    this.interval2 = setInterval(() => {
      this.getTableNBIoTLog()
    }, 300000)
  },
  beforeDestroy() {
    clearInterval(this.interval1)
    clearInterval(this.interval2)
  },
  methods: {
    // Open diagram modal
    openDiagramModal(url, title) {
      console.log('Opening modal with URL:', url, 'and title:', title)
      this.diagramUrl = url
      this.modalTitle = title
      this.showDiagramModal = true
    },
    checkDiagram() {
      axios
        .post('/NB-IoTLogDiagram', { imei: this.$route.query.imei, wid: this.$route.query.wid })
        .then(response => {
          if (response.data && response.data[0]) {
            // เก็บค่า equipment
            this.equipment = response.data[0].equipment || ''

            // ตรวจสอบว่ามี diagram_type หรือไม่ และตั้งค่า default ถ้าเป็น null หรือว่างเปล่า
            const diagramTypeStr = response.data[0].diagram_type || '0STW-1MCB-1PW-1MC-2CB-1TFM'

            // แยกค่าจาก string เช่น "0STW-1MCB-1PW-1MC-4CB-1TFM"
            // ค้นหาและตัดค่าสำหรับแต่ละประเภท
            const findValue = type => {
              const regex = new RegExp(`(\\d+)${type}`, 'i')
              const match = diagramTypeStr.match(regex)
              // กรณีพิเศษสำหรับ TFM ตาม SQL
              if (type === 'TFM' && (!match || match[1] === '')) {
                return '0'
              }
              return match ? match[1] : '0'
            }

            this.diagram_type.STW = findValue('STW')
            this.diagram_type.MCB = findValue('MCB')
            this.diagram_type.PW = findValue('PW')
            this.diagram_type.MC = findValue('MC')
            this.diagram_type.CB = findValue('CB')
            this.diagram_type.TFM = findValue('TFM')

            console.log('Parsed diagram types from:', diagramTypeStr)
            console.log('Results:', this.diagram_type)
          } else {
            // กรณีไม่มีข้อมูลใดๆ ให้ใช้ค่า default
            this.diagram_type.STW = '0'
            this.diagram_type.MCB = '0'
            this.diagram_type.PW = '0'
            this.diagram_type.MC = '0'
            this.diagram_type.CB = '0'
            this.diagram_type.TFM = '0'
            this.equipment = ''
            console.warn('No diagram data found for this device')
          }
        })
        .catch(error => {
          // กรณีเกิด error ให้ใช้ค่า default
          this.diagram_type.STW = '0'
          this.diagram_type.MCB = '0'
          this.diagram_type.PW = '0'
          this.diagram_type.MC = '0'
          this.diagram_type.CB = '0'
          this.diagram_type.TFM = '0'
          console.error('Error fetching diagram data:', error)
        })
    },
    formatDateForAPI(date) {
      if (!date) return ''
      const d = new Date(date)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${year}_${month}_${day}`
    },

    searchByDate() {
      this.dateFormatted = this.formatDateForAPI(this.selectedDate)
      console.log('Date formatted for API:', this.dateFormatted)
      this.getTableNBIoTLog()
    },

    getTableNBIoTLog() {
      let url = `/api-go/logs4g?imei=${this.$route.query.imei}`

      // เพิ่มพารามิเตอร์วันที่ถ้ามีการเลือกวันที่
      if (this.dateFormatted) {
        url += `&date=${this.dateFormatted}`
      }

      // เพิ่มพารามิเตอร์ phase_type ถ้ามีการส่งมา
      if (this.$route.query.phase_type) {
        url += `&phase_type=${this.$route.query.phase_type}`
      }

      // แสดงสถานะกำลังโหลด
      this.isLoading = true
      this.errorMessage = ''

      axios
        .get(url)
        // .post('/tableNB-IoTLog-4G', { imei: this.$route.query.imei, wid: this.$route.query.wid })
        .then(response => {
          this.items = response.data
          this.totalRows = response.data.length
          this.isLoading = false
        })
        .catch(error => {
          console.error('Error fetching data:', error)
          this.errorMessage = 'ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง'
          this.isLoading = false
          // แสดง Toast หรือ Alert เพื่อแจ้งผู้ใช้
          this.$bvToast.toast('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง', {
            title: 'เกิดข้อผิดพลาด',
            variant: 'danger',
            solid: true,
            autoHideDelay: 5000,
          })
        })
    },
    getTableNBIoTLogDebug() {
      axios
        .post('/tableNB-IoTLog-4G-Debug', { imei: this.$route.query.imei })
        .then(response => {
          this.items = response.data
          this.totalRows = response.data.length
        })
    },
    getTableNBIoTLogStatuus() {
      axios
        .post('/tableNB-Status', { imei: this.$route.query.imei, wid: this.$route.query.wid })
        .then(response => {
          this.items1 = response.data
          this.c_other = this.items1[0].c_other
          this.line1 = this.items1[0].line_detect1
          this.line2 = this.items1[0].line_detect2
          this.line3 = this.items1[0].line_detect3
          this.line4 = this.items1[0].line_detect3
          if (this.c_other === '1') {
            this.bool = true
          } else {
            this.bool = false
          }
          this.totalRows1 = response.data.length
        })
    },
    changeValue() {
      if (this.bool) {
        this.$swal({
          title: '<span style="color:#000000">ต้องการเปิดเสียงหม้อแปลงหรือไม่</span>',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'ยกเลิก',
          confirmButtonText: 'ตกลง',
          reverseButtons: true,
          customClass: {
            confirmButton: 'btn btn-primary ml-1',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        }).then(async result => {
          if (result.value) {
            this.bool = !this.bool
            try {
              await axios.post('/swithTFM-4G', { imei: this.$route.query.imei, drv1_cmd: true })
              this.$swal({
                icon: 'success',
                title: '<span style="color:#000000">เปิดเรียบร้อยแล้ว</span>',
                showConfirmButton: false,
                timer: 1000,
              })
            } catch (error) {
              this.$swal({
                title: 'Error!',
                text: ' กดเพื่อดำเนินการต่อ!',
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            }
          }
        })
      } else {
        this.$swal({
          title: '<span style="color:#000000">ต้องการปิดเสียงหม้อแปลงหรือไม่</span>',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'ยกเลิก',
          confirmButtonText: 'ตกลง',
          reverseButtons: true,
          customClass: {
            confirmButton: 'btn btn-primary ml-1',
            cancelButton: 'btn btn-danger',
          },
          buttonsStyling: false,
        }).then(async result => {
          if (result.value) {
            this.bool = !this.bool
            try {
              await axios.post('/swithTFM-4G', { imei: this.$route.query.imei, drv1_cmd: false })
              this.$swal({
                icon: 'success',
                title: '<span style="color:#000000">ปิดเรียบร้อยแล้ว</span>',
                showConfirmButton: false,
                timer: 1000,
              })
            } catch (error) {
              this.$swal({
                title: 'Error!',
                text: ' กดเพื่อดำเนินการต่อ!',
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            }
          }
        })
      }
    },
    checkNBIoTLog() {
      axios
        .post('/checkNB-IoTLog', { imei: this.$route.query.imei })
        .then(response => {
          this.detail = response.data[0].detail
          this.deptid = response.data[0].deptid
          this.dev_type = response.data[0].dev_type
          this.type = response.data[0].equipment
          this.wid = response.data[0].wid
          this.phase_type = response.data[0].phase_type
        })
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    // Custom filter function for the 'other' filter
    customFilter(item) {
      if (this.filter === 'other') {
        // กรองเฉพาะข้อมูลที่ไม่ใช่ circuit, line-check, และ volt-amp*
        return !item.data_type?.includes('circuit')
               && !item.data_type?.includes('line-check')
               && !item.data_type?.includes('volt_amp')
               && !item.e?.startsWith('volt-amp')
      } if (this.filter === 'volt-amp') {
        // สำหรับ volt-amp ให้แสดงทุกข้อมูลที่เกี่ยวข้องกับ volt-amp
        // ตรวจสอบทั้ง data_type (volt_amp) และ e field (volt-amp1, volt-amp2, etc.)
        return item.data_type === 'volt_amp' || item.e?.startsWith('volt-amp')
      } if (this.filter === '') {
        // กรณี All ให้แสดงทั้งหมด
        return true
      }
      // สำหรับ filter อื่นๆ ให้ใช้การกรองปกติ
      return item.data_type?.includes(this.filter)
    },
    checkSwith() {
      axios
        .post('/checkSwith-4G', { imei: this.$route.query.imei })
        .then(response => {
          this.switch.imei = response.data[0].imei
          this.speaker = response.data[0].slave_flag_alarm_b1_Relay_Alarm
          if (this.speaker === 1 && ((this.line1 === 0 && this.line2 === 0) || (this.line3 === 0 && this.line4 === 0))) {
            this.speakerL = false
          } else {
            this.speakerL = true
          }
          this.check = response.data[0].Recheck
          this.drv1_cmd = response.data[0].drv1_cmd
          if (response.data[0].swith === 'On' || response.data[0].drv1_cmd === 'S3P:CMD01:MT01=1;') {
            this.switch.drv1_cmd = true
          } else if (response.data[0].swith === 'Off' || response.data[0].drv1_cmd === 'S3P:CMD01:MT01=0;') {
            this.switch.drv1_cmd = false
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss">

.box {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  color: black;
  // font-weight: bold;
}
</style>

<style>
.diagram-fullscreen-modal {
  width: 100% !important;
  max-width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}

.diagram-fullscreen-modal .modal-content {
  background-color: #000 !important;
  border: 3px solid #ff8c00 !important;
  box-shadow: 0 0 15px #ff8c00, 0 0 30px #ff8c00 !important;
  overflow: hidden !important;
  height: 100vh !important;
  border-radius: 0 !important;
}

.diagram-fullscreen-modal .modal-body {
  overflow: hidden !important;
  padding: 0 !important;
}

.diagram-container {
  padding: 0;
  height: 100vh !important;
}

.border-orange {
  border-bottom: 2px solid #ff8c00 !important;
}

.diagram-button {
  box-shadow: 0 0 10px rgba(255, 140, 0, 0.5);
  border: 1px solid #ff8c00;
  font-weight: bold;
  transition: all 0.3s ease;
}

.diagram-button:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 140, 0, 0.8);
}

.btn-gradient-warning {
  background: linear-gradient(to right, #ff8c00, #ffc107) !important;
  color: #000 !important;
}
</style>
