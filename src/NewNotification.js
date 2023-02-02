import React, { Component, Fragment, useState, useEffect, useRef } from 'react';
import { cache } from '@ivoyant/component-cache';
import {
    Menu,
    Row,
    Col,
    Button,
    Typography,
    Modal,
    Upload,
    message,
    Spin,
} from 'antd';
import { MinusOutlined, ToolOutlined } from '@ant-design/icons';
import { MessageBus } from '@ivoyant/component-message-bus';
import './styles.css';

export default function NewNotification({ visible, setShowNewNotification }) {
    const newNotificationCachedData = cache.get('WhatsNewNotificationData');

    const [notificationData, setNotificationData] = useState(
        newNotificationCachedData ? newNotificationCachedData : undefined
    );
    const [pending, setPending] = useState(true);
    let { attId } = window[window.sessionStorage?.tabId].COM_IVOYANT_VARS;

    const handleNotificationData =
        () => (subscriptionId, topic, eventData, closure) => {
            if (eventData) {
                setNotificationData(eventData);
            }
        };

    useEffect(() => {
        if (notificationData !== undefined) {
            setPending(false);
        }
    }, [notificationData]);

    useEffect(() => {
        setTimeout(() => {
            if (notificationData === undefined) {
                setPending(false);
            }
        }, 8000);
    }, []);

    useEffect(() => {
        MessageBus.subscribe(
            'GETNOTIFICATIONDATA',
            'GETNOTIFICATIONDATA',
            handleNotificationData(),
            {}
        );
        return () => {
            MessageBus.unsubscribe('GETNOTIFICATIONDATA');
            MessageBus.unsubscribe('NEWNOTIFICATION'.concat('.').concat(attId));
        };
    }, []);

    return (
        <>
            <Modal
                title={
                    <>
                        <span>
                            <span>
                                <ToolOutlined
                                    style={{ color: '#52C41A' }}
                                    className="title-icon"
                                />
                            </span>{' '}
                            Latest Releases and Bugfixes{' '}
                            <span className="title-date">
                                {' '}
                                | {notificationData?.releaseDate}
                            </span>
                        </span>
                    </>
                }
                open={visible}
                onOk={() => setShowNewNotification(false)}
                onCancel={() => setShowNewNotification(false)}
                footer={null}
                centered
                closable={true}
                closeIcon={<MinusOutlined />}
                width={600}
            >
                <Spin tip="Loading..." spinning={pending}>
                    {!pending && (
                        <>
                            {notificationData !== undefined ? (
                                <div className="all-section-wrapper">
                                    <div>
                                        {notificationData?.releaseInfo
                                            ?.newFeatures?.length > 0 && (
                                            <>
                                                <div className="topic-header-section">
                                                    <span className="topic-name">
                                                        New Features
                                                    </span>
                                                </div>
                                                {notificationData?.releaseInfo?.newFeatures?.map(
                                                    (feature) => {
                                                        return (
                                                            <>
                                                                <div>
                                                                    <div className="sub-topic-box">
                                                                        <span className="sub-topic-name">
                                                                            {
                                                                                feature?.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="feature-description">
                                                                        <span>
                                                                            {
                                                                                feature?.description
                                                                            }
                                                                        </span>
                                                                    </div>

                                                                    <Row>
                                                                        <Col
                                                                            span={
                                                                                feature?.url
                                                                                    ? 20
                                                                                    : 24
                                                                            }
                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    height: '10px',
                                                                                }}
                                                                            ></div>
                                                                        </Col>
                                                                        {feature?.url && (
                                                                            <Col
                                                                                span={
                                                                                    4
                                                                                }
                                                                            >
                                                                                <div className="url-text">
                                                                                    <a
                                                                                        className="url-text-link"
                                                                                        href={
                                                                                            feature?.url
                                                                                        }
                                                                                        target="_blank"
                                                                                    >
                                                                                        LEARN
                                                                                        MORE
                                                                                    </a>
                                                                                </div>
                                                                            </Col>
                                                                        )}
                                                                    </Row>
                                                                </div>
                                                            </>
                                                        );
                                                    }
                                                )}
                                            </>
                                        )}
                                        {notificationData?.releaseInfo
                                            ?.enhancements?.length > 0 && (
                                            <>
                                                <div className="topic-header-section">
                                                    <span className="topic-name">
                                                        Enhancements
                                                    </span>
                                                </div>
                                                {notificationData?.releaseInfo?.enhancements?.map(
                                                    (feature) => {
                                                        return (
                                                            <>
                                                                <div>
                                                                    <div className="sub-topic-box">
                                                                        <span className="sub-topic-name">
                                                                            {
                                                                                feature?.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="feature-description">
                                                                        <span>
                                                                            {
                                                                                feature?.description
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <Row>
                                                                        <Col
                                                                            span={
                                                                                feature?.url
                                                                                    ? 20
                                                                                    : 24
                                                                            }
                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    height: '10px',
                                                                                }}
                                                                            ></div>
                                                                        </Col>
                                                                        {feature?.url && (
                                                                            <Col
                                                                                span={
                                                                                    4
                                                                                }
                                                                            >
                                                                                <div className="url-text">
                                                                                    <a
                                                                                        className="url-text-link"
                                                                                        href={
                                                                                            feature?.url
                                                                                        }
                                                                                        target="_blank"
                                                                                    >
                                                                                        LEARN
                                                                                        MORE
                                                                                    </a>
                                                                                </div>
                                                                            </Col>
                                                                        )}
                                                                    </Row>
                                                                </div>
                                                            </>
                                                        );
                                                    }
                                                )}
                                            </>
                                        )}
                                        {notificationData?.releaseInfo?.bugFixes
                                            ?.length > 0 && (
                                            <>
                                                <div className="topic-header-section">
                                                    <span className="topic-name">
                                                        Bug Fixes
                                                    </span>
                                                </div>
                                                {notificationData?.releaseInfo?.bugFixes?.map(
                                                    (feature) => {
                                                        return (
                                                            <>
                                                                <div>
                                                                    <div className="sub-topic-box">
                                                                        <span className="sub-topic-name">
                                                                            {
                                                                                feature?.name
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="feature-description">
                                                                        <span>
                                                                            {
                                                                                feature?.description
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <Row>
                                                                        <Col
                                                                            span={
                                                                                feature?.url
                                                                                    ? 20
                                                                                    : 24
                                                                            }
                                                                        >
                                                                            <div
                                                                                style={{
                                                                                    height: '10px',
                                                                                }}
                                                                            ></div>
                                                                        </Col>
                                                                        {feature?.url && (
                                                                            <Col
                                                                                span={
                                                                                    4
                                                                                }
                                                                            >
                                                                                <div className="url-text">
                                                                                    <a
                                                                                        className="url-text-link"
                                                                                        href={
                                                                                            feature?.url
                                                                                        }
                                                                                        target="_blank"
                                                                                    >
                                                                                        LEARN
                                                                                        MORE
                                                                                    </a>
                                                                                </div>
                                                                            </Col>
                                                                        )}
                                                                    </Row>
                                                                </div>
                                                            </>
                                                        );
                                                    }
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="no-data-available">
                                        No data is available to display
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </Spin>
            </Modal>
        </>
    );
}
