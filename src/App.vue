<template>
  <div>
    <FhButton @click="showFhExcessDialog" size="lg" active>button1</FhButton>
    <FhButton size="lg" type="default">button1</FhButton>
    <FhButton size="lg" type="primary">button1</FhButton>
    <FhButton size="lg" type="info">button1</FhButton>
    <FhButton size="lg" type="success">button1</FhButton>
    <FhButton size="lg" type="warning">button1</FhButton>
    <FhButton size="lg" type="error">button1</FhButton>

    <FhButton size="lg" shape="round" active>button1</FhButton>
    <FhButton size="lg" shape="round" type="default">button1</FhButton>
    <FhButton size="lg" shape="round" type="primary">button1</FhButton>
    <FhButton size="lg" shape="round" type="info">button1</FhButton>
    <FhButton size="lg" shape="round" type="success">button1</FhButton>
    <FhButton size="lg" shape="round" type="warning">button1</FhButton>
    <FhButton size="lg" shape="round" type="error">button1</FhButton>

    <FhButton size="lg" shape="circle" active>1</FhButton>
    <FhButton size="lg" shape="circle" type="default">2</FhButton>
    <FhButton size="lg" shape="circle" type="primary">3</FhButton>
    <FhButton size="lg" shape="circle" type="info">4</FhButton>
    <FhButton size="lg" shape="circle" type="success">5</FhButton>
    <FhButton size="lg" shape="circle" type="warning">6</FhButton>
    <FhButton size="lg" shape="circle" type="error">7</FhButton>
    <!-- <FhButton>button1</FhButton>
    <FhButton size="sm" show-loading>button1</FhButton> -->
    <FhExcessDialog ref="FhExcessDialogRef" title="测试" url="/"></FhExcessDialog>
  </div>
</template>

<script setup lang="ts">
import { FhButton, FhCol, FhRow, FhExcessDialog, ExcessDailogElement } from '../packages/components'

let FhExcessDialogRef: ExcessDailogElement | null = $ref(null)

function showFhExcessDialog() {
  if (FhExcessDialogRef) {
    FhExcessDialogRef.show()
  }
}

</script>

<style scoped>
.fh-button {
  margin-right: 30px;
}
</style>