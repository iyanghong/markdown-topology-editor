/**
 * Created by yh on 2021/6/8
 */
export const lineDash = [[], [5, 5], [10, 10], [10, 10, 2, 10]];
export const lineNames = [
    {name: 'curve',label : '曲线', pathD: 'M0 9 a100,50 0 0,1 85,0'},
    {name: 'polyline',label : '折线', pathD: 'M0 4 l40 0 l0 12 l40 0'},
    {name: 'line',label : '直线', pathD: 'M0 9 l85 0'},
    {name: 'mind',label : '脑图曲线', pathD: 'M0 15 C0,8 50,0 85,0'},
];
export const arrows = [
    {value: '', label: '无箭头', icon: 't-icon t-icon t-line'},
    {value: 'triangleSolid', label: '实心三角形', icon: 't-icon t-icon t-from-triangleSolid'},
    {value: 'triangle', label: '空心三角形', icon: 't-icon t-icon t-from-triangle'},
    {value: 'diamondSolid', label: '实心菱形', icon: 't-icon t-icon t-from-diamondSolid'},
    {value: 'diamond', label: '空心菱形', icon: 't-icon t-icon t-from-diamond'},
    {value: 'circleSolid', label: '实心圆', icon: 't-icon t-icon t-from-circleSolid'},
    {value: 'circle', label: '空心圆', icon: 't-icon t-icon t-from-circle'},
    {value: 'line', label: '线型箭头', icon: 't-icon t-icon t-from-line'},
    {value: 'lineDown', label: '下单边线箭头', icon: 't-icon t-icon t-from-lineDown'},
    {value: 'lineUp', label: '上单边线箭头', icon: 't-icon t-icon t-from-lineUp'},
];
