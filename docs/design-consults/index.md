---
layout: page 
title: Design Consultations
--- 

<ul>
  {% for item in site.collections %}
    {% if item.label != "posts" %}
      <li>
        <a href="{{ item.label }}/current.html">{{ item.label }}</a>
      </li>
    {% endif %} 
  {% endfor %}
</ul>