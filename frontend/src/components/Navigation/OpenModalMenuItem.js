// frontend/src/components/Navigation/OpenModalMenuItem.js
import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalMenuItem({
    modalComponent, // component to render inside the modal
    itemText, // text of the menu item that opens the modal
    onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onItemClick) onItemClick();
    };

    return (
        <li onClick={onClick}>{itemText}</li>  //点击的时候将itemtext放在列表里面显示
    );
}

export default OpenModalMenuItem;

// 渲染模态组件：modalComponent 属性用于传递在点击菜单项时应该在模态窗口中渲染的 React 组件。这样你可以根据需要自定义模态的内容。

// 菜单项文本：itemText 属性用于显示菜单项的文本。点击该菜单项会打开相应的模态窗口。

// 点击菜单项的回调函数：onItemClick 属性是一个可选的回调函数，在点击菜单项时将被调用。你可以使用它来执行其他操作或处理菜单项点击时的逻辑。

// 模态窗口关闭的回调函数：onModalClose 属性是一个可选的回调函数，在模态窗口关闭时将被调用。当需要在模态窗口关闭时执行一些操作，比如清理或更新一些状态时，这会很有用。

// 模态上下文集成：该组件使用 useModal 钩子来访问模态窗口上下文。当点击菜单项时，通过调用模态上下文中的 setModalContent 函数，将提供的 modalComponent 属性作为模态窗口中要渲染的内容。

// 设置模态关闭回调：如果提供了 onModalClose 属性，会调用模态上下文中的 setOnModalClose 函数，将提供的 onModalClose 函数设置为模态窗口关闭时将被调用的回调函数。这使得你可以在模态窗口关闭时处理特定的操作。

// 总之，OpenModalMenuItem 组件封装了打开带有自定义内容的模态窗口的逻辑，并提供了选项来处理菜单项点击或模态窗口关闭时的操作。它被设计成可重用且适用于需要使用模态窗口的不同场景。