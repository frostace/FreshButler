<template>
    <div>
        <button
            @click="handleClick"
            v-show="visible"
        >
            <span class="button-content" v-if="$slots.default">
                <slot></slot>
            </span>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        target: {
            type: String,
            default: ""
        },
    },
    data() {
        return {
            visible: true
        };
    },
    methods: {
        handleClick() {
            this.$emit("fixedClick");
        },
    },
};
</script>

<style lang="scss" scoped>
@charset "UTF-8";
@import "../../common/var";
@import "../../common/presets";

button {
    z-index: 100;
    @include clear-default-appearance-all;
    @include decent-shadow;
    background-color: $--primary-color;
    color: #fff;
    font-size: 20px;
    white-space: nowrap;
    box-sizing: border-box;
    margin: 0;
    height: 40px;
    border-radius: 30px;
}

.button-content {
	line-height: 40px;
	height: 40px;
}
</style>