<template>
  <div>
    <FhButton size="lg" active>button1</FhButton>
    <FhButton size="lg" shape="circle">q</FhButton>
    <FhButton size="lg" shape="round">button1</FhButton>

    <hr style="margin: 20px;">
    <FhButton >button1</FhButton>
    <FhButton shape="circle">q</FhButton>
    <FhButton shape="round">button1</FhButton>
    <hr style="margin: 20px;">
    <FhButton size="sm">button1</FhButton>
    <FhButton size="sm" shape="circle">q</FhButton>
    <FhButton size="sm" shape="round">button1</FhButton>

    <hr style="margin: 20px;">
    <FhButton size="lg" active>button1</FhButton>
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

  </div>
</template>

<script setup lang="ts">
import { FhButton, FhCol, FhRow } from '../packages/components'
</script>

<style scoped>
.fh-button {
  margin-right: 30px;
}
</style>