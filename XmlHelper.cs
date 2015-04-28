using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.XPath;
using System.Xml.Xsl;

namespace TestConsole
{
    public class XmlHelper
    {
        public string FilePath { get; set; }

        public XmlHelper(string Path)
        {
            FilePath = Path;
        }

        /// <summary>
        /// 创建一个空的XML文档
        /// </summary>
        /// <param name="Path"></param>
        public void CreateXML()
        {
            XmlWriterSettings Set = new XmlWriterSettings();
            Set.Indent = true; //缩进
            Set.NewLineOnAttributes = false; //属性将在同一行上

            XmlWriter Writer = XmlWriter.Create( FilePath, Set );

            Writer.WriteStartDocument(); //声明
            Writer.WriteEndDocument(); //结束

            Writer.Flush(); //刷新流
            Writer.Close(); //关闭
        }

        /// <summary>
        /// 创建一个XML文档，并将其填充
        /// </summary>
        /// <param name="Path"></param>
        /// <param name="RootName"></param>
        /// <param name="NodeName"></param>
        /// <param name="NodeValue"></param>
        public void CreateXML( string RootName, string[] NodeName, string[] NodeValue)
        {
            XmlWriterSettings Set = new XmlWriterSettings();
            Set.Indent = true; //缩进
            Set.NewLineOnAttributes = false; //属性将在同一行上

            XmlWriter Writer = XmlWriter.Create( FilePath, Set );

            Writer.WriteStartDocument(); //声明
            Writer.WriteStartElement( RootName ); //根结点

            for(int i = 0; i < NodeName.Length; i++)
            {
                Writer.WriteElementString( NodeName[i], NodeValue[i] ); //写入一个结点元素               
            }

            Writer.WriteEndElement();
            Writer.WriteEndDocument(); //结束

            Writer.Flush(); //刷新流
            Writer.Close(); //关闭
        }

        /// <summary>
        /// 更新指定标签的值
        /// </summary>
        /// <param name="TagName"></param>
        /// <param name="Value"></param>
        /// <returns></returns>
        public bool UpdateByTagName(string TagName, string Value)
        {
            XmlDocument doc = new XmlDocument();
            doc.Load( FilePath );
            XmlElement ele = doc.DocumentElement; //获取根结点元素

            if(FindNodeByTagName( ele.ChildNodes, TagName, Value ))
            {
                doc.Save( FilePath ); //进行保存
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// 根据给定的TagName在Node中找到对应的节点并修改其值
        /// </summary>
        /// <param name="node">节点集合</param>
        /// <param name="TagName">标签名</param>
        /// <param name="Value">值</param>
        /// <returns></returns>
        public bool FindNodeByTagName(XmlNodeList node, string TagName, string Value)
        {
            if(null != node)
            {
                foreach(XmlNode item in node)
                {
                    Console.WriteLine( "{0}", item.Name );
                    if(item.Name.Equals( TagName ) ) //进行判断
                    {
                        item.InnerText = Value;
                        return true;
                    }
                    return FindNodeByTagName( item.ChildNodes, TagName, Value ); //对其子结点进行迭代
                }
            }

            return false;
        }

        /// <summary>
        /// 在XPath路径下插入新节点
        /// </summary>
        /// <param name="XPath">如："/RootName/FirstName/SecondName",会在SecondName下插入一个新节点</param>
        /// <param name="TagName">标签名</param>
        /// <param name="Value">值</param>
        /// <returns></returns>
        public bool Insert(string XPath, string TagName, string Value)
        {
            try
            {
                //方法一
                XmlDocument doc = new XmlDocument();
                doc.Load( FilePath ); //加载文档
                XmlElement Root = doc.DocumentElement; //获取根结点元素

                XmlNode ParentNode = Root.SelectSingleNode( XPath ); //根据路径选出其父节点

                XmlNode NewNode = doc.CreateNode( ParentNode.NodeType, TagName, ParentNode.NamespaceURI ); //然后创建新节点
                NewNode.InnerText = Value;
                ParentNode.AppendChild( NewNode ); //添加

                doc.Save( FilePath );

                return true;
            }
            catch(Exception e)
            {
                return false;
            }
        }

        /// <summary>
        /// 删除指定XPath节点，如："/RootName/FirstName/SecondName",会把FirstName下的第一个SecondName儿子节点移除
        /// </summary>
        /// <param name="XPath">XML路径</param>
        /// <param name="TagName"></param>
        /// <param name="Value"></param>
        /// <returns></returns>
        public bool Delete(string XPath )
        {
            try
            {
                //方法一
                XmlDocument doc = new XmlDocument();
                doc.Load( FilePath ); //加载文档
                XmlElement Root = doc.DocumentElement; //获取根结点元素

                XmlNode Node = Root.SelectSingleNode( XPath ); //根据路径选出其父节点
                XmlNode ParentNode = Node.ParentNode;
                ParentNode.RemoveChild( Node );

                doc.Save( FilePath );

                return true;
            }
            catch(Exception e)
            {
                return false;
            }
        }
    }
}
